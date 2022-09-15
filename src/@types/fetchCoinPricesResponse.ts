import { CoinName } from '@/@types/CoinName';
import { Currencies } from '@/utils';

export type FetchCoinPricesResponse = Record<CoinName, Record<Currencies, number>>;
