import { Data } from '@angular/router';

export class AirQualityData {
    constructor(
        private id: number,
        private stIndexLevel: string,
        private stSourceDataDate: Data
    ) { }
}
