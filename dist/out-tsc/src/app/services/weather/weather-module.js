export class WeatherData {
    constructor(name, visibility, main, weather) {
        this.name = name;
        this.visibility = visibility;
        this.main = main;
        this.weather = weather;
    }
}
export class ForecastData {
    constructor(list = []) {
        this.list = list;
    }
}
//# sourceMappingURL=weather-module.js.map