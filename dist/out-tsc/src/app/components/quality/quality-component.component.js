import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var latitude;
var longitude;
let QualityComponentComponent = class QualityComponentComponent {
    constructor(http, service) {
        this.http = http;
        this.service = service;
        this.results = [];
    }
    getAirService() {
        this.service
            .getAirData(latitude, longitude)
            .subscribe((records) => {
            console.log(records);
            this.results = records;
            console.log(this.results);
        });
    }
    ngOnInit() {
        this.map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([23.1688403, 53.1324886]),
                zoom: 8,
            })
        });
        // Popup showing the position the user clicked
        var popup = new ol.Overlay({
            element: document.getElementById('popup')
        });
        this.map.addOverlay(popup);
        this.map.on('click', function (args) {
            console.log(args.coordinate);
            var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
            console.log(lonlat);
            longitude = lonlat[0];
            latitude = lonlat[1];
            (`lat: ${latitude} long: ${longitude}`);
            var element = popup.getElement();
            popup.setPosition(args.coordinate);
            $(element).popover({
                placement: 'top',
                animation: false,
                html: true,
                //content: '<code>' + results.current.indexes[0].value + '</code>'    //nie działa to 
                content: 'Tu powinny być wyniki zamiast na górze :('
            });
            $(element).popover('show');
        });
    }
};
QualityComponentComponent = tslib_1.__decorate([
    Component({
        selector: 'app-quality-component',
        templateUrl: './quality-component.component.html',
        styleUrls: ['./quality-component.component.css']
    })
], QualityComponentComponent);
export { QualityComponentComponent };
//Na wszelki wypadek jakby trzeba bylo dodać pin (strzaleczka tam gdzie sie kliknie)
// var vectorLayer = new ol.layer.Vector({
//   source: new ol.source.Vector({
//     features: [new ol.Feature({
//       geometry: new ol.geom.Point(ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857')),
//     })]
//   }),
//   style: new ol.style.Style({
//     image: new ol.style.Icon({
//       anchor: [0.5, 1],
//       anchorXUnits: "fraction",
//       anchorYUnits: "fraction",
//       scale: 0.05,
//       src: "assets/marker/marker.png"
//     })
//   })
// });
// this.map.addLayer(vectorLayer);
//# sourceMappingURL=quality-component.component.js.map