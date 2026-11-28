# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 21 slides: Remote Sensing — satellites and sensors, spectral bands, '
             'corrections, land cover classification, change detection, related courses.'),
    gundem=['Satellites and sensors', 'Spectral bands', 'Corrections', 'Classification', 'Change detection', 'Related courses'],
    tanim=('Remote sensing extracts information about the Earth without touching it, by measuring <b>reflected and emitted '
           'energy</b> with sensors on satellites, aircraft or drones. An image is not just a color photo but multiband '
           'data, where each band carries a different physical measurement.'),
    tarihce=[
        ('1858', 'Nadar photographs Paris from a balloon: the first known aerial photograph.'),
        ('1960', 'The first weather satellite, TIROS-1, is launched; clouds are imaged routinely from space.'),
        ('1972', 'Landsat 1 is launched: the first civilian program to monitor the Earth in multiple bands.'),
        ('1978', 'Seasat becomes the first civilian satellite to collect synthetic aperture radar (SAR) images from space.'),
        ('2008', 'The US Geological Survey (USGS) opens the Landsat archive to everyone for free.'),
        ('2015', 'Sentinel-2A is launched; Copernicus open data starts an era of frequent, free imagery.'),
    ],
    kavramlar=[
        ('Electromagnetic spectrum', 'Visible, infrared, thermal and microwave bands.'),
        ('Passive and active', 'Optical sensors measure sunlight; radar sends its own signal.'),
        ('Types of resolution', 'Spatial, spectral, temporal and radiometric.'),
        ('Spectral signature', 'Water, plants and soil reflect differently in each band.'),
        ('Band indices', 'NDVI for vegetation, NDWI for water.'),
        ('Corrections', 'Atmospheric, terrain and geometric correction.'),
        ('Land classification', 'Labeling each pixel as forest, field, urban or water.'),
        ('Change detection', 'Comparing images from different dates.'),
    ],
    akis=[('Sense', 'satellite,\naircraft, UAV'), ('Correct', 'atmosphere,\ngeometry'), ('Compute\nbands', 'NDVI,\ncomposite'),
          ('Classify', 'land cover,\nobjects'), ('Map', 'GIS, change\nreport')],
    akis_ornek=('<b>Example:</b> Sentinel-2 images taken before and after a forest fire are corrected for the atmosphere. '
                'A burn index is computed from the near-infrared and shortwave infrared bands; the difference between the two '
                'dates reveals the burned area. The result is measured in hectares and drawn on a map.'),
    onkosul_ek=[
        ('Physics', 'electromagnetic waves, reflection and absorption', None),
        ('Geographic information systems', 'coordinate systems, map projections and layers', None),
        ('Programming', 'large array and file operations in Python', '/teaching/computer-and-introduction-to-programming/?lang=en'),
    ],
    ayrisma=[
        ('GI', 'Image processing provides the general methods; remote sensing applies them to multiband satellite images that carry physical measurements.'),
        ('BG', 'Vision recognizes objects in ordinary photos; remote sensing maps the Earth using spectral signatures and location.'),
        ('ZS', 'Time series analysis provides the general methods; remote sensing tracks change in images of the same place over years.'),
        ('TGI', 'Both treat an image as a physical measurement; medical imaging measures the body, remote sensing the Earth.'),
    ],
    uygulamalar=[
        ('Agriculture', 'Crop health, yield prediction, irrigation.'),
        ('Forestry', 'Burned areas, deforestation monitoring.'),
        ('Disaster management', 'Damage maps after earthquakes and floods.'),
        ('Urban planning', 'Construction and urban sprawl.'),
        ('Climate and environment', 'Monitoring glaciers, sea surface and drought.'),
        ('Defense', 'Reconnaissance and target area analysis.'),
    ],
    araclar=['Google Earth Engine', 'QGIS', 'GDAL', 'rasterio', 'ESA SNAP', 'TorchGeo'],
    veriler=['Landsat archive', 'Sentinel-1 and Sentinel-2', 'EuroSAT', 'BigEarthNet', 'SpaceNet', 'UC Merced Land Use'],
    araclar_not='Satellite imagery is <b>plentiful and free</b>, but accurate labels are scarce: ground truth means going into the field.',
    yanilgilar=[
        ('A satellite image is an ordinary color photo.', 'It also has infrared, thermal and radar bands that the eye cannot see.'),
        ('Higher spatial resolution is always better.', 'For wide areas and frequent revisits, medium resolution is often more suitable.'),
        ('If there are clouds, the satellite sees nothing.', 'Optical sensors cannot; radar (SAR) sees through clouds and at night.'),
        ('This is just an image processing course.', 'Sensor physics, the atmosphere, map projections and field validation are also part of it.'),
    ],
    meslekler=['Remote sensing specialist', 'GIS specialist', 'Agricultural technology engineer', 'Environmental and climate data analyst', 'Geomatics engineer'],
    sonra=('Remote sensing is image processing and computer vision applied to the Earth; it joins with time series analysis and '
           'big data systems. From here you can move on to climate and agricultural data science, geographic information '
           'systems, or satellite image analysis with deep learning.'),
    kaynaklar=[
        'Lillesand, Kiefer and Chipman, <em>Remote Sensing and Image Interpretation</em>, 7th ed., Wiley, 2015.',
        'Jensen, <em>Remote Sensing of the Environment: An Earth Resource Perspective</em>, 2nd ed., Pearson, 2007.',
        'Campbell and Wynne, <em>Introduction to Remote Sensing</em>, 5th ed., Guilford Press, 2011.',
        'Richards, <em>Remote Sensing Digital Image Analysis</em>, 5th ed., Springer, 2013.',
    ],
    islenenler=[
        'Electromagnetic radiation and surface interaction',
        'Sensors, platforms and types of resolution',
        'Radiometric and atmospheric correction',
        'Geometric correction, coordinate systems, projections',
        'Image enhancement and color composites',
        'Spectral indices: NDVI, NDWI',
        'Supervised and unsupervised land-cover classification',
        'Accuracy assessment and ground truth',
        'Change detection and time-series analysis',
        'Thermal sensing and LiDAR',
        'Radar (SAR) imagery and interferometry',
        'Deep learning for satellite imagery',
    ],
    beceriler=['raster and vector layers in QGIS', 'time series in Google Earth Engine', 'processing imagery with GDAL and rasterio',
               'land-cover maps with accuracy tables', 'interpreting indices such as NDVI'],
    hazirlik=[
        ('Can you explain the visible and infrared parts of the electromagnetic spectrum?', 'Electromagnetic waves from high-school physics'),
        ('Can you explain latitude/longitude versus projected (meter) coordinates?', 'A short introductory GIS tutorial with QGIS'),
        ('Can you apply a histogram and thresholding to an image?', '@GI'),
        ('Can you train a classifier and interpret its confusion matrix?', '@MO'),
    ],
    riskler=[
        ('Surveillance and privacy', "High-resolution satellite and drone imagery can track people's homes, vehicles and movements without consent."),
        ('Maps without ground truth', 'A classification map never checked in the field can mislead farming or disaster decisions despite high reported accuracy.'),
        ('Clouds and shadows', 'Unmasked clouds and shadows look like forest loss or flooding in change detection.'),
        ('Models that do not transfer', 'A model trained on European data fails silently in other climates and farming patterns; each region needs validation.'),
    ],
)
