    /**
     * Klasa opisująca dane pogodowe w danym momencie odczytane
     * z api openweathermap.org.
    */
export class WeatherData {
    /**
     * Kostruktor klasy WeatherData().
     * @param {string} name nazwa miasta, którą podał użytkownik
     * @param {number} visibility I don't know 
     * @param {number} main dane z parametrami pogody w danym momencie (temperatura, temperatura odczuwalna, temperatura minimalna, temperatura maksymalna, ciśnienie, wilgotność)
     * @param {string} weather ikonka określająca pogodę w danym momencie
     */
    constructor(
        public name: string,
        public visibility: number,
        public main: number,
        public weather: string,
    ) { }
}

/**
 * Klasa opisująca stan pogody na najbliższe dni odczytane z api opeweathermap.org.
 */
export class ForecastData {
    /**
     * Kostruktor klasy ForecastData().
     * @param list macierz, w której będą przechowywane dane pogodowe na najbliższe dni 
     * (czas pomiaru, temperatura max/min, znak określający pogodę) 
     */
    constructor(
        public list = [],
    ) { }
}