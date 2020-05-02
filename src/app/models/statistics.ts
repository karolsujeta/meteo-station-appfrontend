/**
 * Klasa osatecznie wyznaczająca statystyki, czyli minimalną, maksymalną oraz średnią wartość temperatury, ciśnienia lub siły wiatru.
 * W przypadku minimalnych i maksymalnych wartości, podane zostają również daty, kiedy zanotowano te skrajne wartości.
 */
export class CalculatedProps {

    /**
     * Zmienna przechowująca minimalną temperaturę/ciśnianie/siłę wiatru zanotowaną w danym przedziale czasowym.
     */
     public min: string;
     /**
      * Zmienna przechowująca datę zanotowania najmniejszej temperatury/ciśniania/siły wiatru w danym przedziale czasowym.
      */
     public minaDate: string;
     /**
      * Zmienna przechowująca maksymalną temperaturę/ciśnianie/siłę wiatru zanotowaną w danym przedziale czasowym.
      */
     public max: string;
     /**
      * Zmienna przechowująca datę zanotowania największej temperatury/ciśniania/siły wiatru w danym przedziale czasowym.
      */
     public maxDate: string;
     /**
      * Zmienna przechowująca średnią wartość temperatury/ciśniania/siły wiatru.
      */
    public average: string;


    constructor(min: number, minaDate: Date, max: number, maxDate: Date, averageSum: number, dataCount: number
    ) {
        if (dataCount > 0) {
            this.min = min.toString();
            this.minaDate = minaDate.toString();
            this.max = max.toString();
            this.maxDate = maxDate.toString();
            this.average = (averageSum / dataCount).toFixed(2).toString();
        } else {
            this.min = '-';
            this.minaDate = '-';
            this.max = '-';
            this.maxDate = '-';
            this.average = '-';
        }
    }
}
