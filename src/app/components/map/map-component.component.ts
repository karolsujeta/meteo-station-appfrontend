import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../../services/weather/weather-service.service';
import { HttpClient } from '@angular/common/http';

declare var $: any;


@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})

export class MapComponentComponent implements OnInit {

  public northresults = [];
  public southresults = [];
  public centralresults = [];
  public westresults = [];
  public citywinddegresults = [];
  public citywindspeedresults = [];

  constructor(private http: HttpClient, private service: WeatherServiceService) { }

  ngOnInit() {
    //wywołanie funkcji, które pobiorą kierunek wiatru; na podstawie tych danych na mapie pojawią się odpowiednie strzałki reprezentujace kierunek wiatru
    this.getDataBialystok("Białystok");
    this.getDataKrakow("Kraków");
    this.getDataWarszawa("Warszawa");
    this.getDataPoznan("Poznan");


    $(document).ready(function () {
      $(".map").animate({ opacity: 1 }, 1500)
    })
  }

  //dodanie do tablicy pobranego kierunku wiatru z Białegostoku
  getDataBialystok(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        //console.log(data[0].list[0].wind.deg
        this.northresults.push(data[0].list[0].wind.deg);
      })
  }

  getDataKrakow(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        //console.log(data[0].list[0].wind.deg
        this.southresults.push(data[0].list[0].wind.deg);
      })
  }

  getDataWarszawa(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        //console.log(data[0].list[0].wind.deg
        this.centralresults.push(data[0].list[0].wind.deg);
      })
  }

  getDataPoznan(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        //console.log(data[0].list[0].wind.deg
        this.westresults.push(data[0].list[0].wind.deg);
      })
  }

  //dodanie do tablicy danych o sile i kierunku wiatru we wskazanym przez użytkownika mieście
  getDataCityCheck(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((winddata: any) => {
        this.citywindspeedresults.push(winddata[0].list[0].wind.speed);
        this.citywinddegresults.push(winddata[0].list[0].wind.deg);
      }),
      console.log(this.citywindspeedresults);
  }

}



  //************************************************************POPRZENIE WERSJE MAP*************************************************************************/

// ---------------------------PIERWSZA WERSJA MAPY-------------------------------- //
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




// ---------------------------DRUGA WERSJA MAPY-------------------------------- //

//   this.map = new ol.Map({
  //     target: 'map',
  //     layers: [
  //       new ol.layer.Tile({
  //         source: new ol.source.OSM()
  //       })
  //     ],
  //     view: new ol.View({
  //       center: ol.proj.fromLonLat([23.1688403, 53.1324886]),
  //       zoom: 8,

  //     })
  //   });

  //   this.map.on('click', function (args) {
  //     console.log(args.coordinate);
  //     var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
  //     console.log(lonlat);

  //     var lon = lonlat[0];
  //     var lat = lonlat[1];
  //     var inputlat = document.getElementById("inputLat");
  //     var inputlon = document.getElementById("inputLon");
  //     inputlat.setAttribute('value',lat);
  //     inputlon.setAttribute('value',lon);
  //     (`lat: ${lat} long: ${lon}`);
  //   });
  // }


  //************************************************************POPRZENIE WERSJE MAP*************************************************************************/