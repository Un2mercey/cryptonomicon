import {defineStore, StoreDefinition} from "pinia";
import {ITicker} from "@/@interfaces";
import {Ref, ref} from "vue";

const STORE_NAME = 'tickers';

export const useTickersStore: StoreDefinition = defineStore(STORE_NAME, () => {
    const tickerList: Ref<ITicker[]> = ref([{
        name: "BTC",
        price: 3000,
    }]);

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
