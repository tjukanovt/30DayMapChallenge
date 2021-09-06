
# #30DayMapChallenge 🌎🌏🌎



## Daily social mapping project in November 2021
The official repository for #30DayMapChallenge, It is a daily mapping/cartography/data visualization challenge aimed at the spatial community. 

The idea is to create (and publish) maps based on different themes on each day of the month using the hashtag `#30DayMapChallenge`, You can prepare the maps beforehand, but the main idea is to publish maps from specific topics on specific days listed below. Just include a picture of the map when you post to Twitter with the hashtag. You don't have to sign up anywhere to participate. There are no restrictions on the tools, technologies and the data you use in your maps. Doing less than 30 is also fine (and actually doing all 30 is really hard!). See the *code of conduct* at the bottom of the page.

Happy mapping!

## Themes 📆

*Topics for 2021 will be released 1st of October 2021. Until then you can propose categories on [Twitter](https://twitter.com/tjukanov) or by opening an issue here.* 

*The following list of themes is also awailable as a [calendar ical file](https://github.com/tjukanovt/30DayMapChallenge/blob/master/themes.ical).*


## Data 🗺

You can use **what ever data you want.** But here are a few sources which could help you to get started or give you new ideas 👇

- [OpenStreetMap](https://www.openstreetmap.org/)
	- OpenStreetMap (OSM) is a collaborative project to create a free editable map of the world. If you seek for easy ways to get an extract of the data, you can check for [GeoFabrik](https://www.geofabrik.de/data/download.html) for Shapefiles or [osmdata.xyz](https://download.osmdata.xyz/) for GeoPackages or [Overpass API for GeoJSONs etc.](https://overpass-turbo.eu/) .
- [Natural Earth Data](https://www.naturalearthdata.com/) 
	- Natural Earth is a public domain map dataset available at 1:10m, 1:50m, and 1:110 million scales. Featuring tightly integrated vector and raster data, with Natural Earth you can make a variety of visually pleasing, well-crafted maps with cartography or GIS software.
- [Free GIS Data](https://freegisdata.rtwilson.com/)
	- The site contains a categorised list of links to over 500 sites providing freely available geographic datasets - all ready for loading into a Geographic Information System.
- [OS OpenData](https://www.ordnancesurvey.co.uk/opendatadownload/products.html)
	- Ordnance Survey Open Data for Great Britain. Includes general topographic map data at a range of scales; useful thematic data such as greenspace, terrain, roads and rivers; postcode and place name georeferencing.
- [Humanitarian Data Exchange](https://data.humdata.org/)
	- Interesting datasets from around the world.
- [LINZ Data Service](https://data.linz.govt.nz/)
	- New Zealand land and sea data available for free under a Creative Commons licence via download or OGC APIs.
- [LINZ NZ Aerial Basemap](https://basemaps.linz.govt.nz/)
	- Current aerial imagery for New Zealand available under a Creative Commons licence via WMTS or XYZ tile services.
- [Open Topography](https://opentopography.org/)
	- Lidar point cloud and DEM data.
- [A collective list of free APIs for use in software and web development.](https://github.com/public-apis/public-apis)
- [GIS data repositories spreadsheet by Karen Payne](https://docs.google.com/spreadsheets/d/1utQRlrX3lJniBjWE3rNjLZeTRsbjH-zdjxNmXhhvO9Q/edit#gid=47)

## Tools 🔨🔧

Because the challenge is aimed to be open for everyone, the tools listed here will be *open source tools*. That doesn't mean that **the challenge can be done with any kind of software** (or even without any software). Programming skills are not in any way a requirement to do the maps. 

 - [QGIS](https://www.qgis.org/en/site/)
	 - A Free and Open Source Geographic Information System. A desktop software that allows you to read/write multiple data formats and output (mainly static) maps. 
 - [Kepler](https://kepler.gl/)
	 - Open source geospatial analysis tool for large-scale data sets and for interactive maps.
 - [Aerialod](https://ephtracy.github.io/index.html?page=aerialod)
	 - Not really a GIS tool, but can be used to create some stunning 3D visualizations
 - [Blender](https://www.blender.org/)
	 - Free and open source 3D creation suite. Check out the BlenderGIS extension. 
 - [R packages for geospatial](https://www.r-project.org/)
	 - [sf](https://cran.r-project.org/web/packages/sf/index.html), [ggplot](https://ggplot2.tidyverse.org/), [tmap](https://cran.r-project.org/web/packages/tmap/vignettes/tmap-getstarted.html) and [rayshader](https://www.rayshader.com/) to mention few examples. 
 - [Mapshaper](https://mapshaper.org)
	 - Useful for geospatial data processing in the browser such as file format conversion, map projection, feature simplification, filtering, clipping, merging etc. Can also be run [locally from the command line](https://github.com/mbloch/mapshaper).
 - [Vega-Lite](https://vega.github.io/vega-lite/) 
	 - Declarative visualization specification including [cartographic output](https://vega.github.io/vega-lite/examples/#maps-geographic-displays). Specifications can be written directly in JSON or via program language interfaces such as [altair](https://altair-viz.github.io) (Python) and [elm-vegalite](https://package.elm-lang.org/packages/gicentre/elm-vegalite/latest/VegaLite) (Elm). See, for example, this tutorial on using [OpenStreetMap with elm-vegalite](https://github.com/gicentre/litvis/blob/master/documents/tutorials/geoTutorials/openstreetmap.md)
 - [Vega](https://vega.github.io/vega/)
	 - More flexible but lower-level declarative visualization specification including cartographic output. Specifications can be written directly in JSON or via program language interfaces such [elm-vega](https://package.elm-lang.org/packages/gicentre/elm-vega/latest/).
 - [Litvis](https://github.com/gicentre/litvis)
	 - Literate Visualization notebook environment optimised for specifying visualizations and documenting the design process. While not specific to cartography, can be a useful environment for exploring cartographic design.
 - [Observable](https://observablehq.com)
	 - Reactive notebook environment for generation of visualization and cartographic output embedded in a textual narrative. Focus is on using [d3](https://d3js.org) for specifying visual output.


## Tutorials + helpful resources 📚
If you want to make maps with QGIS, this video is a great starting point. Check out also other videos by [Klas Karlson](https://www.youtube.com/playlist?list=PLNBeueOmuY163iwu4VpZdjqqdU1HkRTP_):
[![QGIS for Absolute Beginners](http://img.youtube.com/vi/kCnNWyl9qSE/0.jpg)](https://www.youtube.com/watch?v=kCnNWyl9qSE)
- [Excellent QGIS introduction YouTube series by Steven Bernard](https://www.youtube.com/playlist?list=PL7HotvlLKHCs9nD1fFUjSOsZrsnctyV2R)
- [QGIS Tutorials and Tips by Ujaval Gandhi](https://www.qgistutorials.com/en/)
- [Tutorial on how to make 3D landscapes and city models by Alasdair Rae](http://www.statsmapsnpix.com/2020/03/making-3d-landscape-and-city-models.html)
- [Blog post by Kenneth Field about the basics of mapmaking](https://medium.com/nightingale/so-you-want-to-make-a-map-58c7f55f6b20)

## Maps, stats and results
In 2020 more than 1000 people posted more than 7000 maps for the challenge on different platforms.

[#30DayMapChallenge bot by Haifeng Niu harvested comprehensive stats and maps from the challenge](https://github.com/hn303/30DayMapChallenge-Bot)   

Check the [30DayMapChallenge2020Metadata repository](https://github.com/dakvid/30DayMapChallenge2020Metadata) by David Friggens and give your contribution there. The aim there is to create an interactive gallery of the results. 

## #30DayMapChallenge 2020
*Want to have your maps included? Make a PR or send me a link!*

 - [David Friggens did another collection also for the 2020 challenge](https://david.frigge.nz/30DayMapChallenge2020/)
 - [Maps by Marco Minghini](https://github.com/MarcoMinghini/30DayMapChallenge-2020) 
 - [Maps by Kate Berg](https://storymaps.arcgis.com/stories/ed9246cfadbf46a2a1c4175dba8515f1)
 - [Maps by Aurelien Chaumet](https://aurelienchaumet.github.io/realisations/30daymapchallenge/)
 - [Maps by Owen Powell](https://owenpowell.wordpress.com/30-day-map-challenge-2020/)
 - [Maps by Andrew Zolnai](https://storymaps.arcgis.com/stories/1a08dd0efbf149a0948c04c93a277b29)
 - [Maps by Ariel Kadouri](https://arielsartistry.com/2020/11/01/30daymapchallenge-2020/index.html)
 - [Maps by Tiago Sousa](https://www.behance.net/gallery/108772495/30DayMapChallenge-2020)
 - [Maps by Richard Vogg](https://github.com/richardvogg/30DayMapChallenge)
 - [Maps by Steph Orellana Bello](https://github.com/sporella/30daymap)
 - [Maps by Valentín Sastre](https://valentinmaps.org/)
 - [Maps by Fedir Gontsa](https://www.behance.net/gallery/108818317/My-30DayMapChallenge-20)
 - [Maps by @tomodraco](https://hicsuntdra.co/blog/twitter-30daymapchallenge-2020/) 
 - [Maps by @samwise_v](https://carto81maps.wordpress.com/30daymapchallenge-2020/)
 - [Maps by Evelyn Uuemaa](https://kevelyn1.github.io/30DayMapChallenge2020/)
 - [Maps by @_anirudhgovind](https://github.com/anirudhgovind/30DayMapChallenge)
 - [Maps on Instagram with the #30DayMapChallenge hashtag](https://www.instagram.com/explore/tags/30daymapchallenge/)

## #30DayMapChallenge 2019
*Here are just a few examples of beautiful cartocollections from the first ever #30DayMapChallenge.*

- [Great collection of all the maps from 2019 by David Friggens](https://david.frigge.nz/30DayMapChallenge/index.html)
- [Aurelien Chaumet collected a great resource about all the maps to Tableau](https://public.tableau.com/profile/aurelien.chaumet?utm_campaign=Spatial%20Awareness&utm_medium=email&utm_source=Revue%20newsletter#!/vizhome/30daymapchallenge/30DayMapChallenge-Week1?publish=yes)
- [Jo Wood & #30DayMapChallenge repo](https://github.com/jwoLondon/30dayMapChallenge)
- [Massive collection by Bob Rudis with maps created with R](https://rud.is/books/30-day-map-challenge/)
- [More maps with R by Cédric Scherer](https://github.com/z3tt/30daymapchallenge)
- [Blog with a great map collection by Evelyn Uuemaa](https://blog.ut.ee/30-maps-of-estonia-in-30-days/)
- [Awesome collection by Maarten Lambrecht](https://www.maartenlambrechts.com/2019/11/01/my-30daymapchallenge.html)
- [Stunning mapping mostly in the third dimension by Craig Taylor](https://mapzilla.co.uk/work/30daymapchallenge)
- [Beautiful works by Fedir Gontsa](https://www.behance.net/gallery/88864239/My-30DayMapChallenge-19)
- [Great blog and beautiful maps by Heikki Vesanto](https://gisforthought.com/30-day-map-challenge-2019/)
- [My own website with few samples](https://tjukanov.org/30daymapchallenge) 

## Code of conduct
No matter if you are a GIS expert or never made a map before this challenge, everyone is welcome to participate, 

But keep in mind a few things:
- All maps you publish have to be **your original work**. Don’t steal content from others. 
- Give **credit to the original data source** whenever possible.
- The challenge is all about **creativity, openness and the joy of beautiful maps and cartography.** It is not a competition,
- **Don’t be an asshole**.

Inspiration for the challenge came from [Inktober](https://inktober.com/) and [Tidy Tuesday](https://github.com/rfordatascience/tidytuesday). 
