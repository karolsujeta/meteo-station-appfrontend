import { DataPoints } from '../models/data-points';

export default class Utility {
    public static FindMinDataPoint = (arr: DataPoints[]): number => {
        let min = Number.MAX_SAFE_INTEGER;
        console.log(min);
        console.log(arr);
        for (const el of arr) {
            if (el.y !== null && el.y < min) {
                min = el.y;
            }
        }
        console.log(min);
        return min;
    }

}