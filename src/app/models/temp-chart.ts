/**
 * Obiekt przechowujący dane z API oraz typ danych wyświetlanych na wykresach.
 */
export class TempChart {
    /**
     * Konstruktor klasy TempChart()  
     * @param value zmienna z wartością parametru, który ma zostać wyświetlony na wykresie (ciśnienie, temperatura).
     * @param period zmienna określająca rodzaj prezentowanych danych, czy są to dane dzienne, miesięczne czy roczne.
     */
    constructor(public value: number, public period: string) {

    }
}
