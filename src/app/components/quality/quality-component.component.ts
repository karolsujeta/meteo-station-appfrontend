import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { QualityServiceService } from '../../services/quality/quality-service.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AirData } from '../../services/quality/quality-module';
// import { QualityServiceService } from 'src/app/services/quality/quality-service.service';

/**
 * @ignore
 */
declare var ol: any;
/**
 * @ignore
 */
declare var $: any;
/**
 * Współrzędna odpowiadająca szerokości geograficznej.
 */
var latitude: any;
/**
 * Współrzędna odpowiadająca długości geograficznej.
 */
var longitude: any;
/**
 * Obiekt wyświetlający wybrane informacje o jakości powietrza z API Airly.
 */
var popupContainer: any;
/**
 * Przycisk zamykania popupa
 */
var popupCloser: any;
/**
 * Obiekt interpretujący wyniki w postaci obrazu (chmurki).
 */
var cloudContainer: any;

/**
 * Quality component
 * Komponent zakładki Jakość Powietrza odpowiedzialny za pobieranie danych z API, wyświetlanie
 * danych o jakości powietrza, z wybranego przez użytkownika punktu na mapie, w postaci tabeli. 
 */
@Component({
  selector: 'app-quality-component',
  templateUrl: './quality-component.component.html',
  styleUrls: ['./quality-component.component.css']
})

/**
 * Klasa odpowiadająca za wyświetlenie mapy w zakładce
 */
export class QualityComponentComponent implements OnInit {

  /**
   * Zmienna przechowująca mapę wyświetloną na stronie.
   */
  private map;

  public resultsTable = [];
/**
   * Zmienna przechowująca odpowiedź z API Airly.
   */

  public results: any;
    /**

   * Konstruktor klasy 'QualityComponentComponent'.
   * @param http
   * @param service
   */
  constructor(private http: HttpClient, private service: QualityServiceService) { }

  /**
   * Inicjowanie wyświetlenia mapy na stronie.
   */
  ngOnInit() {

    popupContainer = document.getElementById('popup');
    popupCloser = document.getElementById('popup-closer');
    cloudContainer = document.getElementById('cloudPopup');

    var overlay = new ol.Overlay({
    element: popupContainer,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  });
  var cloudOverlay = new ol.Overlay({
    element: cloudContainer,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  });

  popupCloser.onclick = function() {
    overlay.setPosition(undefined);
    cloudOverlay.setPosition(undefined);
    popupCloser.blur();
    return false;
  };

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
      }),
      overlays: [overlay,cloudOverlay]
    });

    var serviceTmp = this.service;
    var qualityComponent = this;
    var tempTable = this.resultsTable;


    this.map.on('click', function (args) {
      console.log(args.coordinate);
      var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);
      longitude = lonlat[0];
      latitude = lonlat[1];
      (`lat: ${latitude} long: ${longitude}`);
      serviceTmp
        .getAirData(latitude, longitude)
        .subscribe(
          (records: any) => {
          console.log(records);
          qualityComponent.results = records;
          var data = records;
          data[0].latitude = latitude;
          data[0].longitude = longitude;
          tempTable.push(data);
          console.log(tempTable);
        },
        error => {
          if (error =! null){
            qualityComponent.results = undefined;
          };
        });
        overlay.setPosition(args.coordinate);
        cloudOverlay.setPosition(args.coordinate);
    });
  }
}
