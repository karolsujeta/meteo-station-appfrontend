import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { QualityServiceService } from '../../services/quality/quality-service.service';
// import { QualityServiceService } from 'src/app/services/quality/quality-service.service';

declare var ol: any;
declare var map: any;
declare var $: any;

@Component({
  selector: 'app-quality-component',
  templateUrl: './quality-component.component.html',
  styleUrls: ['./quality-component.component.css']
})

export class QualityComponentComponent implements OnInit {

  private results: any;
  private map;

  constructor(private http: HttpClient, private service: QualityServiceService) { }

  getAirService(term1: string, term2: string) {
    this.service
        .getAirData(term1,term2)
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
        center: ol.proj.fromLonLat([23.1688403, 53.1324886]),
        zoom: 8,

      })
    });

    this.map.on('click', function (args) {
      console.log(args.coordinate);
      var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);

      var lon = lonlat[0];
      var lat = lonlat[1];
      var inputlat = document.getElementById("inputLat");
      var inputlon = document.getElementById("inputLon");
      inputlat.setAttribute('value',lat);
      inputlon.setAttribute('value',lon);
      (`lat: ${lat} long: ${lon}`);
    });
  }

  
}



// -----PIERWSZA WERSJA MAPY-----//
// export class MapComponentComponent implements AfterViewInit {

//   private map;

//   constructor() { }

//   ngAfterViewInit(): void {
//     this.initMap();
//   }

//   private initMap(): void {
//     this.map = L.map('map', {
//       center: [53.1324886, 23.1688403],
//       zoom: 9
//     });

//     const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     });

//     tiles.addTo(this.map);
//   }
// }
