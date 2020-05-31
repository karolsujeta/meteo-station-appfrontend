/**
 * Klasa reprezentująca miejscowość, dla której mogą być policzone statystyki.
 * Obiekt składa się z id oraz nazwy miejscowości. 
 */
export class Station {
    /**
     * Konstruktor obiektu klasy Station
     * @param id numer id
     * @param name nazwa miejscowości
     */
    constructor(public id: number, public name: string) {
    }
}
