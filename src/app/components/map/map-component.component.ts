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
 * Tablica przechowująca dane o kierunku wiatru w Białymstoku.
 */

  public bialystokWindResults = [];
   /**
 * Tablica przechowująca dane o kierunku wiatru w Krakowie.
 */
  public krakowWindResults = [];
   /**
 * Tablica przechowująca dane o kierunku wiatru w Warszawie.
 */
  public warszawaWindResults = [];
   /**
 * Tablica przechowująca dane o kierunku wiatru w Poznaniu.
 */
  public poznanWindResults = [];
   /**
 * Tablica przechowująca dane o kierunku wiatru w Gdańsku.
 */
  public gdanskWindResults = [];
   /**
 * Tablica przechowująca dane o kierunku wiatru ww Wrocławiu.
 */
  public wroclawWindResults = [];
   /**
 * Tablica przechowująca dane o kierunku wiatru w Lublinie.
 */
  public lublinWindResults = [];
   /**
 * Tablica przechowująca dane o kierunku wiatru w Kołobrzegu.
 */
  public kolobrzegWindResults = [];
   /**
 * Tablica przechowująca dane o kierunku wiatru w Łodzi.
 */
  public lodzWindResults = [];
   /**
 * Tablica przechowująca dane o kierunku wiatru w Olsztynie.
 */
  public olsztynWindResults = [];
   /**
 * Tablica przechowująca dane o kierunku wiatru w Szczecinie.
 */
  public szczecinWindResults = [];
   /**
 * Tablica przechowująca dane o temperaturze powietrza w Białymstoku.
 */
  public bialystokTempResults = [];
     /**
 * Tablica przechowująca dane o temperaturze powietrza w Krakowie.
 */
  public krakowTempResults = [];
     /**
 * Tablica przechowująca dane o temperaturze powietrza w Warszawie.
 */
  public warszawaTempResults = [];
     /**
 * Tablica przechowująca dane o temperaturze powietrza w Poznaniu.
 */
  public poznanTempResults = [];
     /**
 * Tablica przechowująca dane o temperaturze powietrza w Gdańsku.
 */
  public gdanskTempResults = [];
     /**
 * Tablica przechowująca dane o temperaturze powietrza we Wrocławiu.
 */
  public wroclawTempResults = [];
     /**
 * Tablica przechowująca dane o temperaturze powietrza w Lublinie.
 */
  public lublinTempResults = [];
     /**
 * Tablica przechowująca dane o temperaturze powietrza w Kołobrzegu.
 */
  public kolobrzegTempResults = [];
     /**
 * Tablica przechowująca dane o temperaturze powietrza w Łodzi.
 */
  public lodzTempResults = [];
     /**
 * Tablica przechowująca dane o temperaturze powietrza w Olsztynie.
 */
  public olsztynTempResults = [];
     /**
 * Tablica przechowująca dane o temperaturze powietrza w Szczecinie.
 */
  public szczecinTempResults = [];
 /**
 * Tablica przechowuje prędkość wiatru w wybranym przez użytkownika mieście.
 */
  public cityWindSpeedResults = [];
/** 
 * Tablica przechowuje kierunek wiatru w wybranym przez użytkownika mieście.
 */
  public cityWindDegreesResults = [];
   /**
 * Tablica przechowuje temperaturę powietrza w wybranym przez użytkownika mieście.
 */
  public cityTemp = [];
   /**
 * zmienna przechowująca informacje czy wystąpił błąd przy wpisywaniu nazwy miejscowości w tabeli z wiatrem.
 */

  windTrigger: boolean = false;
  tempTrigger: boolean = false;
  errorWind: boolean;
     /**
 * zmienna przechowująca informacje czy wystąpił błąd przy wpisywaniu nazwy miejscowości w tabeli z temperaturą.
 */
  errorTemp: boolean;
/**
 * Konstruktor klasy głównej: MapComponentComponent
 * @param http 
 * @param service 
 */
  constructor(private http: HttpClient, private service: WeatherServiceService) { }
  /**
   * Funkcja inicjalizująca wywłanie funkcji pobierających kierunek w kilku wybranych miastach Polski. 

   * Pobrane informacje zostaną przedstawione na mapie w postaci strzałek prezentujących kierunek wiatru.
   */
  ngOnInit() {
    //wywołanie funkcji, które pobiorą kierunek wiatru; na podstawie tych danych na mapie pojawią się odpowiednie strzałki reprezentujace kierunek wiatru
    setInterval(() => {
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
    }, 1000)

    $(document).ready(function () {
      $(".map").animate({ opacity: 1 }, 1500)
    })
  }
/**
 * Funkcja pobierająca z API kierunek wiatru oraz temperaturę powietrza w Białymstoku i zapisujac je odpowiednio w 
 * tablicy "bialystokWindResults[]" i "bialystokTempResults[]". 
 * Odwołuje się do funkcji "getWeatherForecastData()",
 * która pobiera dane z API openweathermap.org
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */
  //dodanie do tablicy pobranego kierunku wiatru oraz temperatury głównych polskich miast

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
 * Funkcja pobierająca z API kierunek wiatru oraz temperaturę powietrza w Krakowie i zapisujac je odpowiednio w 
 * tablicy "krakowWindResults[]" i "krakowTempResults[]". 
 * Odwołuje się do funkcji "getWeatherForecastData()",
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
 * Funkcja pobierająca z API kierunek wiatru oraz temperaturę powietrza w Warszawie i zapisujac je odpowiednio w 
 * tablicy "warszawaWindResults[]" i "warszawaTempResults[]". 
 * Odwołuje się do funkcji "getWeatherForecastData()",
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
 * Funkcja pobierająca z API kierunek wiatru oraz temperaturę powietrza w Poznaniu i zapisujac je odpowiednio w 
 * tablicy "poznanWindResults[]" i "poznanTempResults[]". 
 * Odwołuje się do funkcji "getWeatherForecastData()",
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
 * Funkcja pobierająca z API kierunek wiatru oraz temperaturę powietrza w Gdańsku i zapisujac je odpowiednio w 
 * tablicy "gdanskWindResults[]" i "gdanskTempResults[]". 
 * Odwołuje się do funkcji "getWeatherForecastData()",
 * która pobiera dane z API openweathermap.org
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */

  getDataGdansk(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.gdanskWindResults.push(data[0].list[0].wind.deg);
        this.gdanskTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Gdańsku:", this.gdanskWindResults);
        console.log("Temperatura w Gdańsku:", this.gdanskTempResults);
      })
  }
/**
 * Funkcja pobierająca z API kierunek wiatru oraz temperaturę powietrza we Wrocławiu i zapisujac je odpowiednio w 
 * tablicy "wroclawWindResults[]" i "wroclawTempResults[]". 
 * Odwołuje się do funkcji "getWeatherForecastData()",
 * która pobiera dane z API openweathermap.org
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */
  getDataWroclaw(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.wroclawWindResults.push(data[0].list[0].wind.deg);
        this.wroclawTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru we Wrocławiu:", this.wroclawWindResults);
        console.log("Temperatura we Wrocławiu:", this.wroclawTempResults);
      })
  }
/**
 * Funkcja pobierająca z API kierunek wiatru oraz temperaturę powietrza w Lublinie i zapisujac je odpowiednio w 
 * tablicy "lublinWindResults[]" i "lublinTempResults[]". 
 * Odwołuje się do funkcji "getWeatherForecastData()",
 * która pobiera dane z API openweathermap.org
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */
  getDataLublin(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.lublinWindResults.push(data[0].list[0].wind.deg);
        this.lublinTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Lublinie:", this.lublinWindResults);
        console.log("Temperatura w Lublinie:", this.lublinTempResults);
      })
  }
/**
 * Funkcja pobierająca z API kierunek wiatru oraz temperaturę powietrza w Kołobrzegu i zapisujac je odpowiednio w 
 * tablicy "kolobrzegWindResults[]" i "kolobrzegTempResults[]". 
 * Odwołuje się do funkcji "getWeatherForecastData()",
 * która pobiera dane z API openweathermap.org
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */
  getDataKolobrzeg(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.kolobrzegWindResults.push(data[0].list[0].wind.deg);
        this.kolobrzegTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Kołobrzegu:", this.kolobrzegWindResults);
        console.log("Temperatura w Kołobrzegu:", this.kolobrzegTempResults);
      })
  }
/**
 * Funkcja pobierająca z API kierunek wiatru oraz temperaturę powietrza w Łodzi i zapisujac je odpowiednio w 
 * tablicy "lodzkWindResults[]" i "lodzTempResults[]". 
 * Odwołuje się do funkcji "getWeatherForecastData()",
 * która pobiera dane z API openweathermap.org
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */
  getDataLodz(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.lodzWindResults.push(data[0].list[0].wind.deg);
        this.lodzTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Łodzi:", this.lodzWindResults);
        console.log("Temperatura w Łodzi:", this.lodzTempResults);
      })
  }
/**
 * Funkcja pobierająca z API kierunek wiatru oraz temperaturę powietrza w Olsztynie i zapisujac je odpowiednio w 
 * tablicy "olsztynWindResults[]" i "olsztynTempResults[]". 
 * Odwołuje się do funkcji "getWeatherForecastData()",
 * która pobiera dane z API openweathermap.org
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */
  getDataOlsztyn(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.olsztynWindResults.push(data[0].list[0].wind.deg);
        this.olsztynTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Olsztynie:", this.olsztynWindResults);
        console.log("Temperatura w Olsztynie:", this.olsztynTempResults);
      })
  }
/**
 * Funkcja pobierająca z API kierunek wiatru oraz temperaturę powietrza w Szczecinie i zapisujac je odpowiednio w 
 * tablicy "szczecinWindResults[]" i "szczecinTempResults[]". 
 * Odwołuje się do funkcji "getWeatherForecastData()",
 * która pobiera dane z API openweathermap.org
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */
  getDataSzczecin(term) {
    return this.service.getWeatherForecastData(term)
      .subscribe((data: any) => {
        this.szczecinWindResults.push(data[0].list[0].wind.deg);
        this.szczecinTempResults.push(data[0].list[0].main.temp);
        console.log("Kierunek wiatru w Szczecinie:", this.szczecinWindResults);
        console.log("Temperatura w Szczecinie:", this.szczecinTempResults);
      })
  }
/**
 * Funkcja pobierająca dane z API o wietrze w wybranej przez użytkownika miejscowości. Odwołuje się do funkcji "getWeatherForecastData()",
 * pobiera informacje o sile i kierunku wiatru. Otrzymane informacje są dodawane do tabeli z danymi "wind".
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */
  //dodanie do tablicy danych o sile i kierunku wiatru we wskazanym przez użytkownika mieście
  getDataCityWind(term) {
    this.tempTrigger = true;
    this.service.getWeatherForecastData(term)
      .subscribe((wind: any) => {
        this.errorWind = false;
        // this.cityWindSpeedResults.push(wind[0].list[0].wind.speed);
        this.cityWindSpeedResults = (wind[0].list[0].wind.speed);
        // this.cityWindDegreesResults.push(wind[0].list[0].wind.deg);
        this.cityWindDegreesResults = (wind[0].list[0].wind.deg);
        console.log("Prędkość wiatru: ", this.cityWindSpeedResults);
        console.log("Kierunek wiatru: ", this.cityWindDegreesResults);
      },
        (err) => {
          this.errorWind = true;
          console.error("Błąd! Wprowadzono złą nazwę!", err);
        })
  }
/**
 * Funkcja pobierająca dane z API o temperaturze powietrza w wybranej przez użytkownika miejscowości. 
 * Odwołuje się do funkcji "getWeatherForecastData()",
 * pobiera informacje o temperaturze. Otrzymane informacje są dodawane do tabeli z danymi "temp".
 * @param term parametr określający miejscowość, z której mają zostać pobrane dane o wietrze.
 */
  getDataCityTemp(term) {
    this.windTrigger = true;
    this.service.getWeatherForecastData(term)
      .subscribe((temp: any) => {
        this.errorTemp = false;
        // this.cityTemp.push(temp[0].list[0].main.temp);
        this.cityTemp = (temp[0].list[0].main.temp);

        console.log("Temperatura: ", this.cityTemp);
      },
        (err) => {
          this.errorTemp = true;
          console.error("Błąd! Wprowadzono złą nazwę!", err)
        })
  }
}
