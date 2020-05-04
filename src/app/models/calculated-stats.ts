import { CalculatedProps } from './statistics';

/**
 * Klasa przechowująca policzone statystyki temperatury, ciśnienia oraz siły wiatru.
 */
export class Statistics {

  /**
   *
   * @param temperature
   * @param pressure
   * @param windPower
   */

    constructor(
        public temperature: CalculatedProps,
        public pressure: CalculatedProps,
        public windPower: CalculatedProps) {
    }
}
