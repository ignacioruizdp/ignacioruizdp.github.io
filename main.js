// Code: 15.MAPACALOR
// Date: 2021-09-07
// Creator: Ignacio Ruiz de la Peña
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

require([
    "esri/Map",
    "esri/views/MapView",
"esri/layers/ImageryTileLayer",
    "esri/renderers/FlowRenderer"
], function(Map, MapView, ImageryTileLayer, FlowRenderer) {
    
    const mapa = new Map({
        basemap: "dark-gray-vector"
    });

    const vista = new MapView({
        container: "viewDiv",
        map: mapa,
        center:[-97.457950, 38.741619],
        zoom:5
    });

    const renderer = new FlowRenderer({
        density: 500, // Cantidad máxima de líneas de flujo
        color: [50, 120, 240, 1], // Azul
        flowSpeed: 20, // Reducido para mejorar la visibilidad
        trailLenght:500,
        trailWidth: 0.3, // Debe ser un número, no una cadena
        visualVariables: [{
            type: "color",
            field: "Magnitude",
            stops: [
                { value: 0, color: "white" },
                { value: [2,3], color: "purple" },
                { value: 5, color: "yellow" },
                { value: 8, color: "orange" },
                { value: 15, color: "red" }
                ]
            }, {
                type: "opacity",
                field: "Magnitude",
                stops: [
                { value: 1, opacity: 0.5 },
                { value: 8, opacity: 1 }
                ]
            },{
                type: "size",
                field: "Magnitude",
                stops: [
                { value: 1, size: 1},
                { value: 5, size: 1.25 },
                { value: 8, size: 1.5 },
                { value: 15, size: 1.75 }
                ]
            }
        ],
        });

    const capaFlujo = new ImageryTileLayer({
        url: "https://tiledimageservices.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/NLDAS_Hourly_8_30_2021/ImageServer",
        renderer: renderer,
        effect: "bloom(1.5, 0.5px, 0)"
    });

    mapa.add(capaFlujo);
});



