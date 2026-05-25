# Mapping resources

People come at the #30DayMapChallenge from every direction — writing code, clicking through a GIS, pushing pixels in a design tool, or drawing with pen and paper. The resources below serve all of those. It's a challenge about creativity, not technical skill.

## Getting started

New to this? Pick a starting point that matches how you like to work.

**Never made a map before?** Install [QGIS](https://qgis.org/), the free desktop GIS, load some [Natural Earth](https://www.naturalearthdata.com/) or [OpenStreetMap](https://www.openstreetmap.org/) data, and work through [Ujaval Gandhi's QGIS tutorials](https://www.qgistutorials.com/). Want nothing to install? [Datawrapper](https://www.datawrapper.de/) and [geojson.io](https://geojson.io/) both run in the browser.

**Want to code your maps?** Reach for Python ([geopandas](https://geopandas.org/), [matplotlib](https://matplotlib.org/)) or R ([sf](https://r-spatial.github.io/sf/), [ggplot2](https://ggplot2.tidyverse.org/)), and keep [Geocomputation with R](https://r.geocompx.org/) and [Geocomputation with Python](https://py.geocompx.org/) nearby — both free online. [Observable](https://observablehq.com/) is the no-install route if you'd rather stay in the browser.

**Want interactive web maps?** Start with [MapLibre GL JS](https://maplibre.org/) or [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/), lean on the [Mapbox docs](https://docs.mapbox.com/) (most of what you learn transfers to MapLibre), and prototype quickly in [Observable](https://observablehq.com/).

**Want to make maps by hand?** Pencil, paper, watercolour, fabric, embroidery — whatever you have. See [Maps without a computer](#maps-without-a-computer) below for standout past entries to get you going.

!!! tip
    Don't pick the path you think you *should* pick. Pick the one that sounds fun.

## Data

You can use whatever data you like. These open, global sources are a good place to start.

- [OpenStreetMap](https://www.openstreetmap.org/) — the community-built map of the world; grab extracts via [Geofabrik](https://www.geofabrik.de/data/download.html) or [Overpass turbo](https://overpass-turbo.eu/).
- [Overture Maps](https://overturemaps.org/) — monthly global extracts blending OSM with other open data, cleaned and with stable IDs.
- [Natural Earth](https://www.naturalearthdata.com/) — public-domain vector and raster at small scales; the quickest route to a clean world map.
- [Humanitarian Data Exchange (HDX)](https://data.humdata.org/) — thousands of country-level datasets on population, health, infrastructure and crises.
- [OpenTopography](https://opentopography.org/) — lidar point clouds and global DEMs for when you need terrain.
- [Microsoft Planetary Computer](https://planetarycomputer.microsoft.com/) — cloud-hosted environmental and satellite data, STAC-native so it's easy to query.
- [Copernicus Browser](https://browser.dataspace.copernicus.eu/) — free Sentinel satellite imagery straight from ESA, browseable in the page.
- [Kontur Population](https://www.kontur.io/portfolio/population-dataset/) — a recent global population grid on H3 hexagons that drops straight into a map.

For local and national data, these directories cover most countries.

- [Karen Payne's open data inventory](https://docs.google.com/spreadsheets/d/1utQRlrX3lJniBjWE3rNjLZeTRsbjH-zdjxNmXhhvO9Q/edit) — a huge, regularly updated spreadsheet of open geospatial portals worldwide.
- [Free GIS Data](https://freegisdata.rtwilson.com/) by Robin Wilson — 500+ categorised links to freely available datasets.
- [Data is Plural](https://www.data-is-plural.com/) by Jeremy Singer-Vine — a weekly newsletter of interesting datasets; broader than spatial, consistently excellent.

## Tools

Closed-source tools — ArcGIS, Mapbox Studio, Aurora, Affinity Designer, Illustrator — are all welcome in the challenge. This list leans open-source (with a couple of generous free tiers) so anyone can take part without paying for a licence.

- [Felt](https://felt.com/) — browser-based, collaborative mapmaking with a generous free tier; nothing to install.
- [Datawrapper](https://www.datawrapper.de/) — fast charts and maps, a newsroom favourite for clean output in minutes.
- [geojson.io](https://geojson.io/) — draw or tweak a quick GeoJSON in the browser, no account needed.
- [QGIS](https://qgis.org/) — the open-source desktop GIS; pair it with the [QGIS Training Manual](https://docs.qgis.org/latest/en/docs/training_manual/).
- [R](https://www.r-project.org/) — [sf](https://r-spatial.github.io/sf/), [tmap](https://r-tmap.github.io/tmap/), [ggplot2](https://ggplot2.tidyverse.org/) and [rayshader](https://www.rayshader.com/) make a full cartography toolkit.
- [Python](https://www.python.org/) — [geopandas](https://geopandas.org/), [matplotlib](https://matplotlib.org/) and [lonboard](https://developmentseed.org/lonboard/latest/) for analysis through to fast large-data rendering.
- [Observable](https://observablehq.com/) / [D3](https://d3js.org/) — reactive notebooks for bespoke, code-driven cartography in the browser.
- [Mapshaper](https://mapshaper.org/) — still the easiest way to simplify, clip and convert vector data.
- [Blender](https://www.blender.org/) — full 3D suite; add [BlenderGIS](https://github.com/domlysz/BlenderGIS) to bring spatial data in.
- [Aerialod](https://ephtracy.github.io/index.html?page=aerialod) — a tiny renderer that turns a heightmap into striking 3D terrain.
- [Inkscape](https://inkscape.org/) — open-source vector editor for finishing and laying out a map.
- [Scribus](https://www.scribus.net/) — open-source page layout for when a map becomes a poster or print piece. Prefer Affinity Designer, Illustrator or Figma for the finishing touches? They work just as well.

For interactive web maps:

- [MapLibre GL JS](https://maplibre.org/) — open-source library for fast vector-tile maps in the browser.
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) — the commercial sibling MapLibre forked from; generous free tier, widely used.
- [deck.gl](https://deck.gl/) — WebGL framework for large-scale geospatial layers; pairs with both of the above.
- [Leaflet](https://leafletjs.com/) — older and lighter, but still the simplest way to put a map online.
- [PMTiles](https://docs.protomaps.com/pmtiles/) — a single-file format for serving vector tiles without running a tile server.

## Tutorials & helpful resources

A curated set — short on padding, all free.

### Getting started

- [QGIS Tutorials by Ujaval Gandhi](https://www.qgistutorials.com/) — where most people start with QGIS. Covers the basics through to PyQGIS scripting.
- [Klas Karlson's QGIS playlist](https://www.youtube.com/playlist?list=PLNBeueOmuY163iwu4VpZdjqqdU1HkRTP_) — calm, friendly video walkthroughs. Pairs nicely with the Gandhi tutorials.
- [Mapschool](https://mapschool.io/) by Tom MacWright — a gentle, free intro to what maps actually are. Short read, good background.
- [So you want to make a map](https://medium.com/nightingale/so-you-want-to-make-a-map-58c7f55f6b20) by Kenneth Field — a good short read on the fundamentals of map design.

### Going deeper

- [Geocomputation with R](https://r.geocompx.org/) by Lovelace, Nowosad & Muenchow (2nd ed., 2025) — the book to grab if you're doing spatial in R. Free online, regularly updated.
- [Geocomputation with Python](https://py.geocompx.org/) by Dorman, Graser, Nowosad & Lovelace (2025) — Python sibling of the above. Also free online.
- [Milos Makes Maps](https://www.youtube.com/@milosmakesmaps) — Milos Popovic's YouTube channel. The place for rayshader, 3D maps, and creative cartography in R.
- [Anita Graser's blog](https://anitagraser.com/) — long-running, gets technical. Strong on QGIS, Python (movingpandas), and movement data.
- [Mapbox documentation](https://docs.mapbox.com/) — well-written tutorials and examples for web maps. The product is closed-source, but most of what you learn transfers to MapLibre, the open-source fork.

### Cartographic design

- [somethingaboutmaps tutorials](https://somethingaboutmaps.com/) by Daniel Huffman — beautiful, opinionated walkthroughs on typography, water, colour, projections. Photoshop-based, but the ideas travel to any tool.
- [John Nelson on YouTube](https://www.youtube.com/@JohnNelsonMaps) — short, stylish how-tos for cartographic effects (firefly, antique, ridgeline…). Esri-leaning, principles transferable.
- [ColorBrewer](https://colorbrewer2.org/) — Cynthia Brewer's classic palette tool. Still the default reference for choosing map colours.

### Conference talks

- [NACIS talks on YouTube](https://www.youtube.com/@nacis) — the North American Cartographic Information Society. Cartographic design, storytelling, the craft side of maps.
- [FOSS4G talks on YouTube](https://www.youtube.com/c/FOSS4G) — recordings from the annual Free and Open Source Software for Geospatial conference. Strong on tooling, QGIS, PostGIS, MapLibre, data pipelines.

### Annual companion

- [30DayMapChallenge Resource Guide](https://karomapper.substack.com/) by Karolína Lehotská — refreshed each November with that year's picks.

## Maps without a computer

Plenty of brilliant #30DayMapChallenge entries never touch a screen. Pen, watercolour, embroidery, Lego, ceramics, baking — if you can shape it, you can map with it. It comes back as a theme most years (2020's *Map not made with GIS software*, 2021's *Map made without using a computer*, 2022's *A map without a computer*, 2024's *Pen & paper*, 2025's *Analog*), and the results are reliably some of the most loved maps of the month.

Browse the most-loved hand-made entries from past years:

- [2022 · Day 17 — A map without a computer](2022/day17_A_map_without_a_computer.md)
- [2021 · Day 15 — Map made without using a computer](2021/day15_Map_made_without_using_a_computer.md)
- [2020 · Day 12 — Map not made with GIS software](2020/day12_Map_not_made_with_GIS_software.md)

The "tools" here are whatever you have to hand: pencil, watercolour, fabric, embroidery thread, Lego, ceramics, cross-stitch, beads, paper cutting — and plenty more nobody's tried yet.
