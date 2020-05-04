import { Data } from '@angular/router';

/**
 * Klasa reprezentująca obiekt składający się z danych pobranych z API. Klasa składa się z następujących obiektów:
 * data, temperatura, temperatura minimalna, temperatura maksymalna, opad atmosferyczny, opad śniegu, głębokość śniegu, kierunek wiatru,
 * prędkość wiatru, szczytowy podmuch, nasłonecznienie oraz ciśnienie. 
 */
export class MeteoStatsData {
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
