import { CalculatedProps } from './statistics';

/**
 * Klasa przechowująca policzone statystyki temperatury, ciśnienia oraz siły wiatru.
 */
export class Statistics {

 /**
   * Konstruktor obiektu klasy Statistics
   * @param temperature zmienna przechowująca informacje o temperaturze.
   * @param pressure zmienna przechowująca informacje o ciśnienu.
   * @param windPower zmeinna przechowująca informacje o sile wiatru.
   */
    constructor(
        public temperature: CalculatedProps,
        public pressure: CalculatedProps,
        public windPower: CalculatedProps) {
    }
}
