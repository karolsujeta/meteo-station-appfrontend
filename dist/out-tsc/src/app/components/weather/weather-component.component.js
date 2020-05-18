import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Chart } from 'chart.js';
let WeatherComponentComponent = class WeatherComponentComponent {
    constructor(http, service) {
        this.http = http;
        this.service = service;
        this.resultsWeather = [];
        this.resultsForecastToChartData = [];
        this.resultsForecastToChartTemp = [];
        this.resultsForecastToChartMinTemp = [];
        this.resultsForecastToChartMaxTemp = [];
    }
    ngOnInit() {
        $(document).ready(function () {
            $(".content").animate({ opacity: 1, }, 1500);
            $(".nav").fadeTo("slow", 1);
        });
    }
    showTableContent() {
        $(document).ready(function () {
            $(".content__table").show();
            $(".content__chart").show();
        });
    }
    //metoda do wyświetlania głównych danych pogodowych dla wskazanego miejsca
    getWeatherService(term) {
        this.service
            .getWeatherData(term)
            .subscribe((records) => {
            console.log(records);
            this.resultsWeather.push(records);
        }, error => this.errorMsg = "Nie wprowadzono miejscowości lub wprowadzono złą nazwę!");
        this.errorMsg = null;
    }
    //metoda do wyświetlania danych pogodowych dla przyszłych pięciu dni
    getForecastService(term) {
        this.service
            .getWeatherForecastData(term)
            .subscribe((data) => {
            for (let i = 0; i < data[0].list.length; i++) {
                console.log(data[0].list[i].main);
                this.resultsForecastToChartData.push(data[0].list[i].dt_txt);
                this.resultsForecastToChartTemp.push(data[0].list[i].main.temp);
                this.resultsForecastToChartMinTemp.push(data[0].list[i].main.temp_min);
                this.resultsForecastToChartMaxTemp.push(data[0].list[i].main.temp_max);
            }
            this.resultsForecast = data;
            this.drawChart();
        });
    }
    drawChart() {
        console.log(this.resultsForecastToChartData);
        var myChart = new Chart('chart__forecast', {
            type: 'line',
            data: {
                labels: this.resultsForecastToChartData,
                datasets: [{
                        label: 'Wartość temperatury',
                        data: this.resultsForecastToChartTemp,
                        borderColor: '#5599EC'
                    }],
            }
        });
    }
};
WeatherComponentComponent = tslib_1.__decorate([
    Component({
        selector: 'app-weather-component',
        templateUrl: './weather-component.component.html',
        styleUrls: ['./weather-component.component.css']
    })
], WeatherComponentComponent);
export { WeatherComponentComponent };
//# sourceMappingURL=weather-component.component.js.map