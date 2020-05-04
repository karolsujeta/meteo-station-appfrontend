/**
 * Tworzenie obieku przechowującego dane o jakości powietrza.
 */
export class AirData {
    /**
     * Konstruktor klasy 'AirData' 
     * @param current Zmienna, która bedzie przechowywać dane o jakości powietrza 
     * pobrane z api dla aktualnie klikniętego miejsca.
     */
    constructor(
        public current: any
    ) { }
}
