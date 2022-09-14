import { Currencies } from '@/utils';

export interface IFetchCoinsPricesRequestParams {
    fsyms: string;
    tsyms: Currencies;
}
