import { TempChart } from './temp-chart';
/**
 * Klasa przechowująca listę danych, które mają zostać wyświetlone na wykresach. 
 * Dane są przechowywane w postaci listy z elementami klasy DataPoints.
 */
export class DataPointsList {
    /**
     * 
     */
    dataPoints: Array<DataPoints> = new Array<DataPoints>();
    /**
     * Konstruktor klasy DataPointsList
     * @param tempCharts zmienna przechowująca dane, które mają zostać przedstawione na wykresie.
     */
    constructor(tempCharts: Array<TempChart>) {
        let i = 1;
        for (const tempData of tempCharts) {
            this.dataPoints.push(new DataPoints(i, tempData.value, tempData.period));
            i++;
        }
    }
}
/**
 * Klasa reprezentująca punkty prezentowane na wykrsach.
 */
export class DataPoints {
    /**
     * Konstruktor klasy DataPoints
     * @param x wartość punktu na osi poziomej
     * @param y wartość punktu na osi pionowej
     * @param label podpis punktu
     */
    constructor(public x: number, public y: number, public label: string) {

    }
}
