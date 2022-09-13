import { computed, ComputedRef, Ref, ref } from 'vue';
import { defineStore, Store, StoreDefinition } from 'pinia';
import { findIndex } from 'lodash';
import { ICoin, IFetchCoinsPricesRequestParams } from '@/@interfaces';
import { coinFinder, coinsConverter, Currency } from '@/utils';
import { CoinName, CoinsPrices, FetchCoinsPricesResponse, FetchCoinsResponse, Undefined } from '@/@types';
import httpClient from '@/stores/http-client';
import * as apiUrls from '@/stores/api-urls';

interface State {
    coins: ICoin[];
    tickers: ICoin[];
    coinsPrices: CoinsPrices;
}

interface Getters {
    getTickerLastPrice: () => (name: CoinName) => Undefined<number>;
}

interface Actions {
    fetchCoins: () => Promise<void>;
    fetchCoinsPrices: (currency: Currency) => Promise<void>;
    addTicker: (name: CoinName) => Promise<void>;
    removeTicker: (ticker: ICoin) => void;
}

type TickersStoreDefinition = StoreDefinition<typeof STORE_NAME, State, Getters, Actions>;
export type CoinsStore = Store<typeof STORE_NAME, State, Getters, Actions>;

const STORE_NAME = 'coins';
export const useCoinsStore: TickersStoreDefinition = defineStore(STORE_NAME, () => {
    const coins: Ref<ICoin[]> = ref([]);
    const tickers: Ref<ICoin[]> = ref([]);
    const coinsPrices: Ref<CoinsPrices> = ref({});

    const getTickerLastPrice: ComputedRef<(name: CoinName) => Undefined<number>> = computed(
        () => (name: CoinName) => coinsPrices.value[name]?.at(-1)
    );

    function fetchCoins(): Promise<void> {
        return httpClient.get<FetchCoinsResponse>(apiUrls.GET_COINS_LIST).then((response: FetchCoinsResponse) => {
            coins.value = coinsConverter(response);
        });
    }

    function fetchCoinsPrices(currency: Currency): Promise<void> {
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
        getTickerLastPrice,
        fetchCoins,
        fetchCoinsPrices,
        addTicker,
        removeTicker,
    };
});
