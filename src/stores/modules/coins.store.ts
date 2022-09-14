import { findIndex } from 'lodash';
import { defineStore, Store, StoreDefinition } from 'pinia';
import { computed, ref } from 'vue';
import { ICoin, IFetchCoinsPricesRequestParams } from '@/@interfaces';
import { CoinName, CoinsPrices, FetchCoinsPricesResponse, FetchCoinsResponse, Undefined } from '@/@types';
import { coinFinder, coinsConverter, Currencies, StoreNames } from '@/utils';
import httpClient from '@/stores/http-client';
import * as apiUrls from '@/stores/api-urls';

type GetTickerLastPrice = (name: CoinName) => Undefined<number>;

interface State {
    coins: ICoin[];
    tickers: ICoin[];
    coinsPrices: CoinsPrices;
}

interface Getters {
    isCoinsFetched: () => boolean;
    getTickerLastPrice: () => GetTickerLastPrice;
}

interface Actions {
    fetchCoins: () => Promise<void>;
    fetchCoinsPrices: (currency: Currencies) => Promise<void>;
    addTicker: (name: CoinName) => Promise<void>;
    removeTicker: (ticker: ICoin) => void;
}

type SD = StoreDefinition<StoreNames.COINS, State, Getters, Actions>;
export type CoinsStore = Readonly<Store<StoreNames.COINS, State, Getters, Actions>>;

export const useCoinsStore: SD = defineStore(StoreNames.COINS, () => {
    const coins = ref<ICoin[]>([]);
    const tickers = ref<ICoin[]>([]);
    const coinsPrices = ref<CoinsPrices>({});

    const isCoinsFetched = computed<boolean>(() => Boolean(coins.value.length));
    const getTickerLastPrice = computed<GetTickerLastPrice>(() => (name: CoinName) => coinsPrices.value[name]?.at(-1));

    function fetchCoins(): Promise<void> {
        return httpClient.get<FetchCoinsResponse>(apiUrls.GET_COINS_LIST).then((response: FetchCoinsResponse) => {
            coins.value = coinsConverter(response);
        });
    }

    function fetchCoinsPrices(currency: Currencies): Promise<void> {
        const params: IFetchCoinsPricesRequestParams = {
            fsyms: tickers.value.map((ticker: ICoin) => ticker.name).join(','),
            tsyms: currency,
        };

        return httpClient
            .get<FetchCoinsPricesResponse>(apiUrls.GET_PRICES, { params })
            .then((response: FetchCoinsPricesResponse) => {
                Object.keys(response).forEach((key: CoinName) => {
                    const priceValue: number = response[key][currency];
                    if (coinsPrices.value[key]) {
                        coinsPrices.value[key].push(priceValue);
                    } else {
                        coinsPrices.value[key] = [priceValue];
                        tickers.value.forEach((ticker: ICoin) => {
                            ticker.currency = currency;
                        });
                    }
                });
            });
    }

    function addTicker(name: CoinName): Promise<void> {
        return new Promise((resolve, reject) => {
            const selectedTicker: Undefined<ICoin> = coinFinder(tickers.value, name);
            if (selectedTicker) {
                reject(new Error(`The '${name}' coin already selected.`));
            } else {
                const ticker: Undefined<ICoin> = coinFinder(coins.value, name);
                if (ticker) {
                    tickers.value.push(ticker);
                    resolve();
                } else {
                    reject(new Error(`The '${name}' coin not found.`));
                }
            }
        });
    }

    function removeTicker({ name }: ICoin): void {
        const idx: number = findIndex(tickers.value, { name });
        if (idx >= 0) {
            tickers.value.splice(idx, 1);
        }
    }

    return {
        coins,
        tickers,
        coinsPrices,
        isCoinsFetched,
        getTickerLastPrice,
        fetchCoins,
        fetchCoinsPrices,
        addTicker,
        removeTicker,
    };
});
