import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { QualityServiceService } from '../../services/quality/quality-service.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
// import { QualityServiceService } from 'src/app/services/quality/quality-service.service';


declare var ol: any;
declare var $: any;
var latitude: any;
var longitude: any;

@Component({
  selector: 'app-quality-component',
  templateUrl: './quality-component.component.html',
  styleUrls: ['./quality-component.component.css']
})


export class QualityComponentComponent implements OnInit {

  private results: any;
  private map;
  

  constructor(private http: HttpClient, private service: QualityServiceService) { }

  
  getAirService() {
    this.service
        .getAirData(latitude,longitude)
        .subscribe((records: any) => {
          console.log(records);
          this.results = records;
        })
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
        center: ol.proj.fromLonLat([23.1688403,53.1324886]),
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