export class WeatherData {
    constructor(
        public name: string,
        public visibility: number,
        public main: number,
        public weather: string,
    ) { }
}

export class ForecastData {
    constructor(
        public list = [],
    ) { }
}