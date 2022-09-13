import { CoinName, Nullable } from '@/@types';
import { Currency } from '@/utils';

export interface ICoin {
    id: string;
    imageUrl: string;
    name: CoinName;
    symbol: string;
    coinName: string;
    fullCoinName: string;
    description: string;
    isTrading: boolean;
    currency: Nullable<Currency>;
}
