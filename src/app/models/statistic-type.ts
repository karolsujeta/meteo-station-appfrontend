/**
 * Klasa określająca typ statystyk możliwych do wyboru przez użytkownika.
 * Dostępne są trzy typy: statystyki godzinowe, statystyki dzienne oraz statystyki miesięczne.
 * Typ statystyk określa jakie dane zostaną pobrane z API, czyli czy pobrane pomiary będą w odtępach godzinowych, dniowych czy miesięcznych.
 */
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
