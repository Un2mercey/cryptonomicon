import { Currency } from '@/utils';

export interface IFetchCoinsPricesRequestParams {
    fsyms: string;
    tsyms: Currency;
}
