import { Data } from '@angular/router';

/**
 * Klasa reprezentująca obiekt składający się z danych pobranych z API. Klasa składa się z następujących obiektów:
 * data, temperatura, temperatura minimalna, temperatura maksymalna, opad atmosferyczny, opad śniegu, głębokość śniegu, kierunek wiatru,
 * prędkość wiatru, szczytowy podmuch, nasłonecznienie oraz ciśnienie. 
 */
export class MeteoStatsData {
    /**
     * Konstruktor obiektu klasy MeteoStatData
     * @param date zmienna określająca datę pomiaru
     * @param temperature zmienna przechowująca temperature pobraną z API
     * @param temperatureMin zmienna przechowująca wartość temperatury minimalnej pobraną z API
     * @param temperatureMax zmienna przechowująca wartość temperatury maksymalnej pobraną z API
     * @param precipitation zmienna przechowująca opad atmosferyczny pobrany z API
     * @param snowfall zmienna przechowująca opad śniegu pobrany z API
     * @param snowdepth zmienna przechowująca głębokość śniegu pobrany z API
     * @param winddirection zmienna przechowująca kierunek wiatru pobrany z API
     * @param windspeed zmienna przechowująca prędkość wiatru pobrany z API
     * @param peakgust zmienna przechowująca szczytowy podmuch pobrany z API
     * @param sunshine zmienna przechowująca nasłonecznienie pobrane z API
     * @param pressure zmienna przechowująca ciśnienie pobrane z API
     */
    constructor(
        public date: Data,
        public temperature: number,
        public temperatureMin: number,
        public temperatureMax: number,
        public precipitation: number, // opad atmosferyczny
        public snowfall: number,
        public snowdepth: number,
        public winddirection: number,
        public windspeed: number,
        public peakgust: number, // szczytowy podmuch
        public sunshine: number,
        public pressure: number
    ) { }
}
