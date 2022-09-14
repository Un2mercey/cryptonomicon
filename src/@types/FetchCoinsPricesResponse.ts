import { CoinName } from '@/@types/CoinName';
import { Currencies } from '@/utils';

export type FetchCoinsPricesResponse = Record<CoinName, Record<Currencies, number>>;
