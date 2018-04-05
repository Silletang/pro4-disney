/**
 * file: flying.js
 * purpose: Mapbox map and interaction
 **/

// token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2lsbGV0YW5nIiwiYSI6ImNqZmpkMGdyNzViZ2UzM25yaXg0cHlleW8ifQ.-J0VZa_CGDGeP-awavZTPw';

// draw the map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/silletang/cjfl1ix539jj62ro4l9b565u4',
    center: [-51.7216, 64.1835],
    zoom: 2,
    bearing: 56,
    pitch: 0,
    bearing: 0,
    speed: 0.2,
    hash: true
});


// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

$(function () { /// doc ready

    $('#tekst').load('ajax/konge.html'); // load HTML by AJAX

    // fly: LØVERNES KONGE - afrikas savanne
    $('#konge').click(function () {
        map.flyTo({
            center: [28.720, -1.643],
            zoom: 9,
            bearing: 45,
            pitch: 45
        });

        $('#tekst').load('ajax/konge.html'); // load HTML by AJAX
    });
    
     /**
    * Marker til LØVERNES KONGE **/
    
    var marker = new mapboxgl.Marker()
    .setLngLat([28.720, -1.643])
    .addTo(map);


    // fly: HERKULES Olympus - bjerg i grækenland
    $('#herkules').click(function () {
        map.flyTo({
            center: [22.5012, 39.9813],
            zoom: 9,
            bearing: -45,
            pitch: 45
        });

        $('#tekst').load('ajax/herkules.html'); // load HTML by AJAX
    });
    
     /**
    * Marker til HERKULES
    **/
   
    map.on('load', function() {
    map.loadImage('images/herkules.gif', function(error, image) {
        if (error) throw error;
        map.addImage('cat', image);
        map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [22.5012, 39.9813]
                        }
                    }]
                }
            },
            "layout": {
                "icon-image": "cat",
                "icon-size": 0.25
            }
        });
    });
});
    

    // fly: Polynesion hawaii
    $('#moana').click(function () {
        map.flyTo({
            center: [-156.2217, 20.7039],
            zoom: 9,
            bearing: 5,
            pitch: 45
        });

        $('#tekst').load('ajax/moana.html'); // load HTML by AJAX
    });
    
    
    
    
    
    /**
    * Marker til MOANA
    **/
    var marker = new mapboxgl.Marker()
    .setLngLat([-156.2217, 20.7039])
    .addTo(map);
    

    
    
    
   


    // fly: Indisk jungle
    $('#jungle').click(function () {
        map.flyTo({
            center: [83.3086, 26.7829],
            zoom: 9,
            bearing: 90,
            pitch: 45
        });

        $('#tekst').load('ajax/jungle.html'); // load HTML by AJAX
    });
    
    
    
     /**
    * Marker til JUNGLEBOGEN
    **/
    
    var marker = new mapboxgl.Marker()
    .setLngLat([83.3086, 26.7829])
    .addTo(map);

    
   

    // fly: By i Iran
    $('#aladdin').click(function () {
        map.flyTo({
            center: [51.6788, 32.6630],
            zoom: 9,
            bearing: 12,
            pitch: 45
        });

        $('#tekst').load('ajax/aladdin.html'); // load HTML by AJAX
    });

    
    
    
     /**
    * Marker  TIL ALADDIN
    **/
    var marker = new mapboxgl.Marker()
    .setLngLat([51.6788, 32.6630])
    .addTo(map);
    
    
    

    // fly: Congos jungle
    $('#tarzan').click(function () {
        map.flyTo({
            center: [15.6981, -0.7678],
            zoom: 9,
            bearing: 12,
            pitch: 45
        });

        $('#tekst').load('ajax/tarzan.html'); // load HTML by AJAX
    });
    
    /**
    * Marker, simple TIL TARZAN
    **/
    var marker = new mapboxgl.Marker()
    .setLngLat([15.6981, -0.7678])
    .addTo(map);
    
    
});




// 3D bygninger
map.on('load', function () {
    // Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }


    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "height"]
            ],
            'fill-extrusion-base': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "min_height"]
            ],
            'fill-extrusion-opacity': .6
        }
    }, labelLayerId);
});

