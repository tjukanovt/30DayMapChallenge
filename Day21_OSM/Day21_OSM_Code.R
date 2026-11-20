library(osmdata)
library(sf)
library(tidyverse)
library(ggplot2)
library(terra)
library(tidyterra)
library(cowplot)
library(magick)
library(systemfonts)

#----------Assign boundig box coordinates
lelystad_bb<-c(xmin = 5.388, ymin = 52.489, xmax = 5.535, ymax = 52.532)
nl_crs = 28992
##--------------------Must reproject bounding box to 28992
lelystad_bb_sf <- st_as_sfc(st_bbox(lelystad_bb, crs = st_crs(4326)))
lelystad_bb_rp <- st_transform(lelystad_bb_sf, 28992)

#----------Import OSM Data
trees <- opq(bbox = lelystad_bb) |> 
  add_osm_feature(key = 'natural', value = 'tree')
trees <-osmdata_sf(trees)

all_roads <-opq(bbox = lelystad_bb) |> 
  add_osm_feature(key = 'highway')
all_roads <- osmdata_sf(all_roads)

water <- opq(bbox = lelystad_bb) |> 
  add_osm_feature(key = 'natural', value = 'water')
water <- osmdata_sf(water)

sea <- opq(bbox = lelystad_bb) |> 
  add_osm_feature(key = 'place', value = 'sea')
sea <- osmdata_sf(sea)

railway <- opq(bbox = lelystad_bb) |> 
  add_osm_feature(key = 'railway', value = 'rail')
railway <- osmdata_sf(railway)

##--------------------Tree data was rubbish, so use the PDOK Vegeatieobject data
trees_pdok <- st_read('Day21_OSM/data/PDOK_vegetatieobject.gpkg') |> 
  st_crop(lelystad_bb_rp) 
class(trees_pdok$terminationDate)
trees_pdok_filtered <- filter(trees_pdok, plus.type == 'boom', is.na(terminationDate)) 

##--------------------If overpass keeps failing
get_overpass_url()
urls <-list_overpass_urls()
urls
set_overpass_url(urls[2])
overpass_status()

##--------------------Must reproject osm data into 28992 to match AHN tile
all_roads_lines <- st_transform(all_roads$osm_lines, nl_crs) |> 
  st_crop(lelystad_bb_rp)
trees_pts <- st_transform(trees$osm_points, nl_crs) |> 
  st_crop(lelystad_bb_rp)
water_lines <- st_transform(water$osm_lines, nl_crs) |> 
  st_crop(lelystad_bb_rp)
water_polygons <- st_transform(water$osm_polygons, nl_crs) |> 
  st_crop(lelystad_bb_rp)
railway_lines <- st_transform(railway$osm_lines, nl_crs) |> 
  st_crop(lelystad_bb_rp)
meer_polygons <- st_transform(water$osm_multipolygons, nl_crs) |> 
  st_crop(lelystad_bb_rp)

#----------Merge 9 geotiff DTM tiles from AHN
files <- list.files('Day21_OSM/data',
                    pattern = '\\.tif$',
                    full.names = TRUE)
tiles <-lapply(files, rast)
###------------------------------Check if the tiles overlap
lapply(tiles, ext)

##--------------------Create virtual raster file to map it
elevation <- vrt(files)
crs(elevation) ### Already in Amersfoort CRS so no need to reproject

###------------------------------Extract AHN values using the reprojected coordinates and add it to sf object
elev_mean <- extract(elevation, vect(all_roads_lines), fun = mean, na.rm = TRUE)
all_roads_lines$elev_mean <- elev_mean[[2]]

###------------------------------Crop the virtual raster and drop values outside a range and create classified slope map
elevation_cropped <- crop(elevation, lelystad_bb_rp) |> 
  clamp(lower = -7, upper = 5, values = FALSE)
slope <- terrain(elevation_cropped, neighbors = 8, unit = 'degrees')

rcl <- matrix(
  c(0,  2,   1,
    2,  5,   2,
    5,  8,  3,
    8, 17,  4,
    17, 24,  5,
    24, 33, 6,
    33, Inf, 7),
  ncol = 3,
  byrow = TRUE
)

slope_class <- classify(slope, rcl, right = FALSE)

class_labels <- c(
  "Flat", "Undulating", "Moderate",
  "Hilly", "Modreately Steep", "Steep", "Very Steep")

levels(slope_class) <- data.frame(
  value = 1:7,
  slope_class = class_labels
)

slope_test <- slope_class |> 
  filter(slope_class != 'Flat', slope_class != 'Undulating')

slope_colors <- c(
  'Moderate' = '#F5C3BC',
    'Hilly'= '#ED7272',
    'Moderately Steep' = '#F4F1BB',
  'Steep' = '#C4A782',
  'Very Steep' = '#95764E')

#----------Filter and reclassify road lines
summary(all_roads_lines)
roads_plot <- all_roads_lines |> 
  mutate(
    maxspeed_kmh = suppressWarnings(as.numeric(as.character(maxspeed))),
    speed_group = case_when(
      maxspeed_kmh<=30 ~ 'Pedestrian friendly (<30km/h)',
      maxspeed_kmh<=60 ~ 'Car priority (30~60km/h)',
      maxspeed_kmh>60 ~ 'Car only (>60km/h)',
      TRUE ~ NA_character_)) |> 
  filter(!is.na(speed_group), !is.na(elev_mean))

#----------Plot Altogether
main_map <- ggplot()+
  geom_sf(data = meer_polygons,
          fill = '#7795A2',
          color = NA,
          alpha = 0.4) +
  
  geom_sf(data = water_polygons,
          aes(alpha = "Water"),
          fill = '#7795A2',
          color = 'transparent') +
  scale_alpha_manual(
    name = "Inland Water",
    values = c (Water = 0.5))+
  
  geom_sf(data = tress_pdok, 
          aes(shape = 'Trees'),
          color = 'darkgreen', size = 1, alpha = 0.1, name = 'tree') +
  scale_shape_manual(name = 'Feature',
                     values = c ('Trees' = 16))+
  guides(shape = guide_legend(
    override.aes = list(color = "darkgreen", alpha = 1, size = 2)))+
  
  geom_sf(data = railway_lines,
          aes(linewidth = "Railway"),
          color = '#FF6F00',
          key_glyph = draw_key_path) +
  scale_linewidth_manual(
    name = "Railway",
    values = c(Railway = 0.5)) +
  
  geom_spatraster(data = slope_test, interpolate = FALSE, alpha = 0.6) +
  scale_fill_manual(values = slope_colors, na.value = NA, name = 'Slope') +
  
  geom_sf(data = roads_plot,
          aes(color = elev_mean, linetype = speed_group),
          linewidth = 0.6,
          key_glyph = draw_key_path) +
  scale_color_gradientn(
    name = "Mean road elevation (m)",
    values = c (0, 0.5, 1),
    colors = c ('#A71FD8', '#41B8EB', '#ED72BC')) +
  scale_linetype_manual(
    name = "Speed limit",
    values = c( "Pedestrian friendly (<30km/h)" = '11',
                "Car priority (30~60km/h)" = 'dashed',
                "Car only (>60km/h)" = 'solid')) +
  
  labs(title = "Day21_OSM : How were Lelystad's trees planned?") +
  theme_void() +
  coord_sf(clip = "on")+
  theme(plot.title = element_text(
    size = 20, 
    face = 'bold', 
    hjust = 0.5,
    family = 'serif'),
    plot.title.position = 'plot',
    legend.position = 'right',
    legend.justification = 'top',
    legend.location = 'plot')

final_map <- ggdraw(main_map) +
  draw_image('Day21_OSM/data/Logo_Rbanism_ Full.png',
             x = 0.88, y = 0.11,
             width = 0.1, height = 0.15) +
  draw_label(
    'Yoonji Kim | #30DayMapChallenge#Day21_OSM | Sources: OSM & PDOK',
    x = 0.04, y = 0.1,
    hjust = 0, vjust = 0,
    size = 10, color = 'darkgrey')


final_map


