import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../../services/weather/weather-service.service';
import { HttpClient } from '@angular/common/http';

declare var $: any;

/**
 * Komponent zakładki Mapy.
 * 
 * Wyświetlanie kierunków wiatru na mapie oraz danych o wietrze dla wybranej
 * przez użytkownika miejscowości.
 */
@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})

export class MapComponentComponent implements OnInit {

/**
 * Tablica przechowująca dane o kierunku wiatru w północnej części kraju.
 */
  private northresults = [];
  /**
 * Tablica przechowująca dane o kierunku wiatru w południowej części kraju.
 */
  private southresults = [];
  /**
 * Tablica przechowująca dane o kierunku wiatru w centralnej części kraju.
 */
  private centralresults = [];
  /**
 * Tablica przechowująca dane o kierunku wiatru w zachodniej części kraju.
 */
  private westresults = [];
  /**
   * Tablica przechowująca dane pobrane z api o kierunkach wiatru w wybranych przez użytkownika miejscowościach.
   */
  private citywinddegresults = [];
   /**
   * Tablica przechowująca dane pobrane z api o prędkości wiatru w wybranych przez użytkownika miejscowościach.
   */
  private citywindspeedresults = [];
/**
 * Konstruktor klaasy głównej: MapComponentComponent
 * @param http 
 * @param service 
 */


  public bialystokWindResults = [];
  public krakowWindResults = [];
  public warszawaWindResults = [];
  public poznanWindResults = [];
  public gdanskWindResults = [];
  public wroclawWindResults = [];
  public lublinWindResults = [];
  public kolobrzegWindResults = [];
  public lodzWindResults = [];
  public olsztynWindResults = [];
  public szczecinWindResults = [];
  public bialystokTempResults = [];
  public krakowTempResults = [];
  public warszawaTempResults = [];
  public poznanTempResults = [];
  public gdanskTempResults = [];
  public wroclawTempResults = [];
  public lublinTempResults = [];
  public kolobrzegTempResults = [];
  public lodzTempResults = [];
  public olsztynTempResults = [];
  public szczecinTempResults = [];
  public cityWindSpeedResults = [];
  public cityWindDegreesResults = [];
  public cityTemp = [];
  errorWind: boolean;
  errorTemp: boolean;


  constructor(private http: HttpClient, private service: WeatherServiceService) { }

  /**
   * Funkcja inicajlizująca wywłanie funkcji pobierających kierunek wiatru w Białymstoku, Krakowie, Warszawie, Poznaniu. 
   * Pobrane informacje zostaną przedstawione na mapie w postaci strzałek prezentujących kierunek wiatru.
   */
  ngOnInit() {
    //wywołanie funkcji, które pobiorą kierunek wiatru; na podstawie tych danych na mapie pojawią się odpowiednie strzałki reprezentujace kierunek wiatru
    this.getDataBialystok("Białystok");
    this.getDataKrakow("Kraków");
    this.getDataWarszawa("Warszawa");
    this.getDataPoznan("Poznan");
    this.getDataGdansk("Gdańsk");
    this.getDataWroclaw("Wrocław");
    this.getDataLublin("Lublin");
    this.getDataLodz("Łódź");
    this.getDataOlsztyn("Olsztyn");
    this.getDataSzczecin("Szczecin");

    $(document).ready(function () {
      $(".map").animate({ opacity: 1 }, 1500)
    })
  }

/**
 * Funkcja pobierająca z API kierunek wiatru w Białymstoku i zapisujaca go w tablicy "northresults[]"". Odwołuje się do funkcji "getWeatherForecastData()",
 * która pobiera dane z API openweathermap.org
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */
  //dodanie do tablicy pobranego kierunku wiatru z Białegostoku

  getDataBialystok(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.bialystokWindResults.push(data[0].list[0].wind.deg);
        this.bialystokTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Białymstoku:", this.bialystokWindResults);
        console.log("Temperatura w Białymstoku:", this.bialystokTempResults);
      })
  }
/**
 * Funkcja pobierająca z API kierunek wiatru w Krakowie i zapisujaca go w tablicy "southresults[]. Odwołuje się do funkcji "getWeatherForecastData()",
 * która pobiera dane z API openweathermap.org
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */
  getDataKrakow(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.krakowWindResults.push(data[0].list[0].wind.deg);
        this.krakowTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Krakowie:", this.krakowWindResults);
        console.log("Temperatura w Krakowie:", this.krakowTempResults);
      })
  }
/**
 * Funkcja pobierająca z API kierunek wiatru w Warszawie i zapisujaca go w tablicy "centralresults[]. Odwołuje się do funkcji "getWeatherForecastData()",
 * która pobiera dane z API openweathermap.org
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */
  getDataWarszawa(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.warszawaWindResults.push(data[0].list[0].wind.deg);
        this.warszawaTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Warszawie:", this.warszawaWindResults);
        console.log("Temperatura w Warszawie:", this.warszawaTempResults);
      })
  }
/**
 * Funkcja pobierająca z API kierunek wiatru w Poznaniu i zapisujaca go w tablicy "westresults[]. Odwołuje się do funkcji "getWeatherForecastData()",
 * która pobiera dane z API openweathermap.org
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */
  getDataPoznan(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.poznanWindResults.push(data[0].list[0].wind.deg);
        this.poznanTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Poznaniu:", this.poznanWindResults);
        console.log("Temperatura w Poznaniu:", this.poznanTempResults);
      })
  }

/**
 * Funkcja pobierająca dane z API o wietrze w wybranej przez użytkownika miejscowości. Odwoluje się do funkcji "getWeatherForecastData()",
 * pobiera informacje o sile i kierunku wiatru. Otrzymane informacje są ddawane do tabeli z danymi "winddata".
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */
  //dodanie do tablicy danych o sile i kierunku wiatru we wskazanym przez użytkownika mieście
 
  getDataGdansk(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.gdanskWindResults.push(data[0].list[0].wind.deg);
        this.gdanskTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Gdańsku:", this.gdanskWindResults);
        console.log("Temperatura w Gdańsku:", this.gdanskTempResults);
      })
  }

  getDataWroclaw(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.wroclawWindResults.push(data[0].list[0].wind.deg);
        this.wroclawTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru we Wrocławiu:", this.wroclawWindResults);
        console.log("Temperatura we Wrocławiu:", this.wroclawTempResults);
      })
  }

  getDataLublin(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.lublinWindResults.push(data[0].list[0].wind.deg);
        this.lublinTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Lublinie:", this.lublinWindResults);
        console.log("Temperatura w Lublinie:", this.lublinTempResults);
      })
  }

  getDataKolobrzeg(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.kolobrzegWindResults.push(data[0].list[0].wind.deg);
        this.kolobrzegTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Kołobrzegu:", this.kolobrzegWindResults);
        console.log("Temperatura w Kołobrzegu:", this.kolobrzegTempResults);
      })
  }

  getDataLodz(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.lodzWindResults.push(data[0].list[0].wind.deg);
        this.lodzTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Łodzi:", this.lodzWindResults);
        console.log("Temperatura w Łodzi:", this.lodzTempResults);
      })
  }

  getDataOlsztyn(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.olsztynWindResults.push(data[0].list[0].wind.deg);
        this.olsztynTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Olsztynie:", this.olsztynWindResults);
        console.log("Temperatura w Olsztynie:", this.olsztynTempResults);
      })
  }

  getDataSzczecin(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.szczecinWindResults.push(data[0].list[0].wind.deg);
        this.szczecinTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Szczecinie:", this.szczecinWindResults);
        console.log("Temperatura w Szczecinie:", this.szczecinTempResults);
      })
  }

  //dodanie do tablicy danych o sile i kierunku wiatru we wskazanym przez użytkownika mieście
  getDataCityWind(term) {
    this.service.getWeatherForecastData(term)
      .subscribe((wind: any) => {
        this.errorWind = false;
        this.cityWindSpeedResults.push(wind[0].list[0].wind.speed);
        this.cityWindDegreesResults.push(wind[0].list[0].wind.deg);
        console.log("Prędkość wiatru: ", this.cityWindSpeedResults);
        console.log("Kierunek wiatru: ", this.cityWindDegreesResults);
      },
        (err) => {
          this.errorWind = true;
          console.error("Błąd! Wprowadzono złą nazwę!", err);
        })
  }

  getDataCityTemp(term) {
    this.service.getWeatherForecastData(term)
      .subscribe((temp: any) => {
        this.errorTemp = false;
        this.cityTemp.push(temp[0].list[0].main.temp);
        console.log("Temperatura: ", this.cityTemp);
      },
        (err) => {
          this.errorTemp = true;
          console.error("Błąd! Wprowadzono złą nazwę!", err)
        })
  }
}
