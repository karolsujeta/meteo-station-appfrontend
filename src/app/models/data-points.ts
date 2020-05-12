import { TempChart } from './temp-chart';

export class DataPointsList {
    dataPoints: Array<DataPoints> = new Array<DataPoints>();
    constructor(tempCharts: Array<TempChart>) {
        let i = 1;
        for (const tempData of tempCharts) {
            this.dataPoints.push(new DataPoints(i, tempData.value, tempData.period));
            i++;
        }
    }
}



export class DataPoints {
    constructor(public x: number, public y: number, public label: string) {

    }
}
