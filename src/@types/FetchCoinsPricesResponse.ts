import { CoinName } from '@/@types/CoinName';
import { Currency } from '@/utils';

export type FetchCoinsPricesResponse = Record<CoinName, Record<Currency, number>>;
