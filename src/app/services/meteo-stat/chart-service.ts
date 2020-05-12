import { TempChart } from '../../models/temp-chart';
import { DataPoints, DataPointsList } from '../../models/data-points';

export class ChartService {
    constructor() {

    }

    public CalculateTemperatureData(type: string, data): Array<DataPoints> {
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
}
