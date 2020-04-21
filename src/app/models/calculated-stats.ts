import { CalculatedProps } from './statistics';

export class Statistics {
    constructor(
        public temperature: CalculatedProps,
        public pressure: CalculatedProps,
        public windPower: CalculatedProps) {
    }
}
