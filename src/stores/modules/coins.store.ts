import { findIndex } from 'lodash';
import { Store, StoreDefinition, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { CoinName, CoinPrices, FetchCoinPricesResponse, FetchCoinsResponse, Undefined } from '@/@types';
import { Coin, FetchCoinPricesRequestParams } from '@/@interfaces';
import { ApiUrls, StoreIds } from '@/stores';
import { Currencies, coinFinder, coinsConverter, httpClient } from '@/utils';

interface State {
    coins: Coin[];
    tickers: Coin[];
    coinPrices: CoinPrices;
}

interface Getters {
    isCoinsFetched: () => boolean;
    getTickerLastPrice: () => GetTickerLastPrice;
}

interface Actions {
    fetchCoins: () => Promise<void>;
    fetchCoinPrices: (currency: Currencies) => Promise<void>;
    addTicker: (name: CoinName) => Promise<void>;
    removeTicker: (ticker: Coin) => void;
}

type GetTickerLastPrice = (name: CoinName) => Undefined<number>;
type SD = StoreDefinition<StoreIds.COINS, State, Getters, Actions>;
export type CoinsStore = Readonly<Store<StoreIds.COINS, State, Getters, Actions>>;

export const useCoinsStore: SD = defineStore(StoreIds.COINS, () => {
    const coins = ref<Coin[]>([]);
    const tickers = ref<Coin[]>([]);
    const coinPrices = ref<CoinPrices>({});

    const isCoinsFetched = computed<boolean>(() => Boolean(coins.value.length));
    const getTickerLastPrice = computed<GetTickerLastPrice>(() => (name: CoinName) => coinPrices.value[name]?.at(-1));

    function fetchCoins(): Promise<void> {
        return httpClient.get<FetchCoinsResponse>(ApiUrls.GET_COINS_LIST).then((response: FetchCoinsResponse) => {
            coins.value = coinsConverter(response);
        });
    }

    function fetchCoinPrices(currency: Currencies): Promise<void> {
        const params: FetchCoinPricesRequestParams = {
            fsyms: tickers.value.map((ticker: Coin) => ticker.name).join(','),
            tsyms: currency,
        };

        return httpClient
            .get<FetchCoinPricesResponse>(ApiUrls.GET_PRICES, { params })
            .then((response: FetchCoinPricesResponse) => {
                Object.keys(response).forEach((key: CoinName) => {
                    const priceValue: number = response[key][currency];
                    if (coinPrices.value[key]) {
                        coinPrices.value[key].push(priceValue);
                    } else {
                        coinPrices.value[key] = [priceValue];
                        tickers.value.forEach((ticker: Coin) => {
                            ticker.currency = currency;
                        });
                    }
                });
            });
    }

    function addTicker(name: CoinName): Promise<void> {
        return new Promise((resolve, reject) => {
            const selectedTicker: Undefined<Coin> = coinFinder(tickers.value, name);
            if (selectedTicker) {
                reject(new Error(`The '${name}' coin already selected.`));
            } else {
                const ticker: Undefined<Coin> = coinFinder(coins.value, name);
                if (ticker) {
                    tickers.value.push(ticker);
                    resolve();
                } else {
                    reject(new Error(`The '${name}' coin not found.`));
                }
            }
        });
    }

    function removeTicker({ name }: Coin): void {
        const idx: number = findIndex(tickers.value, { name });
        if (idx >= 0) {
            tickers.value.splice(idx, 1);
        }
    }

    return {
        coins,
        tickers,
        coinPrices,
        isCoinsFetched,
        getTickerLastPrice,
        fetchCoins,
        fetchCoinPrices,
        addTicker,
        removeTicker,
    };
});
