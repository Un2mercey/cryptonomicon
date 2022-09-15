import { Currencies } from '@/utils';

export interface FetchCoinPricesRequestParams {
    fsyms: string;
    tsyms: Currencies;
}
