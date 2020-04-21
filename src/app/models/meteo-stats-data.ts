import { Data } from '@angular/router';

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
