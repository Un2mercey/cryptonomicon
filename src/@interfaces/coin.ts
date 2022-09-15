import { CoinName, Nullable } from '@/@types';
import { Currencies } from '@/utils';

export interface Coin {
    id: string;
    imageUrl: string;
    name: CoinName;
    symbol: string;
    coinName: string;
    fullCoinName: string;
    description: string;
    isTrading: boolean;
    currency: Nullable<Currencies>;
}
