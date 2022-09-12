import { Ref, ref } from 'vue';
import { defineStore, Store, StoreDefinition } from 'pinia';
import { ICoin } from '@/@interfaces';
import { CoinsStore, useCoinsStore } from '@/stores';
import { Undefined } from '@/@types';

interface State {
    tickerList: ICoin[];
}

interface Getters {}

interface Actions {
    addTicker: (name: string) => Promise<void>;
    removeTicker: (ticker: ICoin) => void;
}

type TickersStoreDefinition = StoreDefinition<typeof STORE_NAME, State, Getters, Actions>;
export type TickersStore = Store<typeof STORE_NAME, State, Getters, Actions>;

const STORE_NAME = 'tickers';
export const useTickersStore: TickersStoreDefinition = defineStore(STORE_NAME, () => {
    const tickerList: Ref<ICoin[]> = ref([]);

    function addTicker(name: string): Promise<void> {
        const { coinsList }: CoinsStore = useCoinsStore();
        return new Promise((resolve, reject) => {
            const selectedTicker: Undefined<ICoin> = tickerList.value.find(
                (c: ICoin) =>
                    name === c.coinName.toLowerCase() ||
                    name === c.name.toLowerCase() ||
                    name === c.symbol.toLowerCase()
            );

            if (selectedTicker) {
                reject(new Error(`Coin ${name} already selected.`));
            } else {
                const ticker: Undefined<ICoin> = coinsList.find(
                    (c: ICoin) =>
                        name === c.coinName.toLowerCase() ||
                        name === c.name.toLowerCase() ||
                        name === c.symbol.toLowerCase()
                );

                if (ticker) {
                    tickerList.value.push(ticker);
                    resolve();
                } else {
                    reject(new Error(`Coin ${name} doesn't found.`));
                }
            }
        });
    }

    function removeTicker(ticker: ICoin): void {
        const tickerIdx: number = tickerList.value.findIndex((coin: ICoin) => coin.name === ticker.name);
        if (tickerIdx >= 0) {
            tickerList.value.splice(tickerIdx, 1);
        }
    }

    return {
        tickerList,
        addTicker,
        removeTicker,
    };
});
