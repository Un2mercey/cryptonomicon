import { defineStore, Store, StoreDefinition } from 'pinia';
import { ITicker } from '@/@interfaces';
import { Ref, ref } from 'vue';

interface State {
    tickerList: ITicker[];
}

interface Getters {}

interface Actions {
    addTicker: (newTicker: ITicker) => void;
    removeTicker: (idx: number) => void;
}

type TickersStoreDefinition = StoreDefinition<typeof STORE_NAME, State, Getters, Actions>;
export type TickersStore = Store<typeof STORE_NAME, State, Getters, Actions>;

const STORE_NAME = 'tickers';
export const useTickersStore: TickersStoreDefinition = defineStore(STORE_NAME, () => {
    const tickerList: Ref<ITicker[]> = ref([
        {
            name: 'BTC',
            price: 3000,
        },
    ]);

    function addTicker(newTicker: ITicker): void {
        tickerList.value.push(newTicker);
    }

    function removeTicker(idx: number): void {
        tickerList.value.splice(idx, 1);
    }

    return {
        tickerList,
        addTicker,
        removeTicker,
    };
});
