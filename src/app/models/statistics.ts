export class CalculatedProps {
    public min: string;
    public minaDate: string;
    public max: string;
    public maxDate: string;
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
