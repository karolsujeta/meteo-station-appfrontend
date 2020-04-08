export class StatisticType {
    constructor(public id: number, public name: string) {

    }
}


export const StatisticTypeList: StatisticType[] =
    [
        {
            id: 1,
            name: 'Godzinowy'
        },
        {
            id: 2,
            name: 'Dzienny'
        },
        {
            id: 3,
            name: 'Miesięczny'
        }
    ];

