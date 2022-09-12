import { Currencies, CurrenciesSymbol } from '@/utils';
import { Nullable } from '@/@types';

export interface ICoin {
    id: string;
    imageUrl: string;
    name: string;
    symbol: string;
    coinName: string;
    fullCoinName: string;
    description: string;
    isTrading: boolean;
    price: Nullable<number>;
    currency: Nullable<Currencies>;
    currencySymbol: Nullable<CurrenciesSymbol>;
}
