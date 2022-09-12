export interface IFetchCurrenciesResponse {
    [coinName: string]: {
        [currency: string]: number;
    };
}
