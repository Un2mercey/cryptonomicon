import { defineStore, Store, StoreDefinition } from 'pinia';
import { ITicker } from '@/@interfaces';
import { Ref, ref } from 'vue';

interface State {
    coins: unknown[];
    tickerList: ITicker[];
}

interface Getters {}

interface Actions {
    addTicker: (newTicker: ITicker) => void;
    removeTicker: (ticker: ITicker) => void;
}

type TickersStoreDefinition = StoreDefinition<typeof STORE_NAME, State, Getters, Actions>;
export type TickersStore = Store<typeof STORE_NAME, State, Getters, Actions>;

const STORE_NAME = 'tickers';
export const useTickersStore: TickersStoreDefinition = defineStore(STORE_NAME, () => {
    const tickerList: Ref<ITicker[]> = ref([
        {
            name: 'BTC',
            price: 3000,
            sym: 'USD',
        },
        {
            name: 'ETH',
            price: 5000,
            sym: 'USD',
        },
    ]);

    const coins: Ref<unknown[]> = ref([]);

    function addTicker(newTicker: ITicker): void {
        tickerList.value.push(newTicker);
    }

    function removeTicker(ticker: ITicker): void {
        const tickerIdx: number = tickerList.value.findIndex((t: ITicker) => t.name === ticker.name);
        if (tickerIdx >= 0) {
            tickerList.value.splice(tickerIdx, 1);
        }
    }

    return {
        coins,
        tickerList,
        addTicker,
        removeTicker,
    };
});
