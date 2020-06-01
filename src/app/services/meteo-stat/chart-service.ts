import { TempChart } from '../../models/temp-chart';
import { DataPoints, DataPointsList } from '../../models/data-points';
/**
 * Klasa przygotowująca dane pobrne z API do wyświetenia ich w postci wykresów kolumnowych.
 */
export class ChartService {
    /**
     * Konstruktor klasy ChartService().
     */
    constructor() {

    }
    /**
     * Funkcja przygotowująca dnane prezentujące temperaturę powietrza pobrane z API. 
     * Dane są przechowywane w zmiennej klasy DataPointsList.
     * @param type zmienna przechowująca informacje o typie danych, 1 - statystyki godzinowe, 2 - statystyki dzienne, 3 - statystyki miesięczne
     * @param data zmienna przechowująca dane, któe mają zostać przygotowane do wyświetlenia.
     */
    public CalculateTemperatureData(type: string, data): Array<DataPoints> {
        /**
         * 
         */
        const tempList = new Array<TempChart>();
        for (const element of data) {
            if (type === '1') {
                if (element.temperature !== null) {
                    tempList.push(new TempChart(element.temperature, element.time));
                }
            } else if (type === '2') {
                if (element.temperature !== null) {
                    tempList.push(new TempChart(element.temperature, element.date));
                }
            } else if (type === '3') {
                if (element.temperature_mean !== null) {
                    tempList.push(new TempChart(element.temperature_mean, element.month));
                }
            }
        }
        return new DataPointsList(tempList).dataPoints;
    }
    /**
     * Funkcja przygotowująca dnane prezentujące ciśnienie pobrane z API. 
     * Dane są przechowywane w zmiennej klasy DataPointsList.
     * @param type zmienna przechowująca informacje o typie danych, 1 - statystyki godzinowe, 2 - statystyki dzienne, 3 - statystyki miesięczne
     * @param data zmienna przechowująca dane, któe mają zostać przygotowane do wyświetlenia.
     */
    public CalculatePressureData(type: string, data): Array<DataPoints> {
        const tempList = new Array<TempChart>();
        for (const element of data) {
            if (type === '1') {
                tempList.push(new TempChart(element.pressure, element.time));
            } else if (type === '2') {
                tempList.push(new TempChart(element.pressure, element.date));
            } else if (type === '3') {
                tempList.push(new TempChart(element.pressure, element.month));
            }
        }
        return new DataPointsList(tempList).dataPoints;
    }
}
