import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { QualityServiceService } from '../../services/quality/quality-service.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AirData } from '../../services/quality/quality-module';
// import { QualityServiceService } from 'src/app/services/quality/quality-service.service';


declare var ol: any;
declare var $: any;
var latitude: any;
var longitude: any;
var popupCloserEventAdded = false;
// var results: any;

@Component({
  selector: 'app-quality-component',
  templateUrl: './quality-component.component.html',
  styleUrls: ['./quality-component.component.css']
})


export class QualityComponentComponent implements OnInit {


  private map;
  //public results : AirData[] = [];

  constructor(private http: HttpClient, private service: QualityServiceService) { }

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

    var serviceTmp = this.service;

    this.map.on('click', function (args) {
      console.log(args.coordinate);
      var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);

      longitude = lonlat[0];
      latitude = lonlat[1];
      (`lat: ${latitude} long: ${longitude}`);
      var mapTmp = this;
      serviceTmp
        .getAirData(latitude, longitude)
        .subscribe((records: any) => {
          showPopup(mapTmp, records)
        });
      
    });
    if (popupCloserEventAdded === false) {
      window.addEventListener('click', closePopup);
      popupCloserEventAdded = true;
    }
  }
}

function closePopup(event) {
  var element = this.document.getElementById('popup');
  if (element === null) {
    $('.popover').remove();
    window.removeEventListener('click', closePopup);
    popupCloserEventAdded = false;
  } else if (!element.contains(<Node>event.target)){
    $('.popover').remove();
  }
};

function showPopup(map, qualityData) {
  // Popup showing the position the user clicked
  var popup = new ol.Overlay({
    element: document.getElementById('popup'),
  });
  map.addOverlay(popup);

  var element = popup.getElement();
  // if ($(element).data('popover')) {
    // $(element).popover('destroy');
  // }
  console.log(qualityData);
  popup.setPosition(ol.proj.fromLonLat([longitude, latitude]));
  $(element).popover({
    placement: 'top',
    animation: false,
    html: true,
    autoPan: true,
    content: '<code>' +
      qualityData[0].current.values[0].value + ' ' +
      qualityData[0].current.values[2].value + ' ' +
      qualityData[0].current.values[1].value + ' ' +
      qualityData[0].current.indexes[0].value + ' ' +
      qualityData[0].current.indexes[0].level + ' ' +
      qualityData[0].current.indexes[0].description + '</code>'
  });
  $(element).popover('show');

}



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