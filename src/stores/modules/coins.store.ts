import { Ref, ref } from 'vue';
import { defineStore, Store, StoreDefinition } from 'pinia';
import { ICoin, IFetchCoinsListResponse } from '@/@interfaces';
import * as apiUrls from '@/stores/api-urls';
import httpClient from '@/stores/http-client';

interface State {
    coinsList: ICoin[];
}

interface Getters {}

interface Actions {
    fetchCoinsList: () => Promise<void>;
}

type TickersStoreDefinition = StoreDefinition<typeof STORE_NAME, State, Getters, Actions>;
export type CoinsStore = Store<typeof STORE_NAME, State, Getters, Actions>;

const STORE_NAME = 'coins';
export const useCoinsStore: TickersStoreDefinition = defineStore(STORE_NAME, () => {
    const coinsList: Ref<ICoin[]> = ref([]);

    function fetchCoinsList(): Promise<void> {
        return httpClient
            .get<IFetchCoinsListResponse>(apiUrls.GET_COINS_LIST)
            .then((response: IFetchCoinsListResponse) => {
                coinsList.value = Object.values(response).map(
                    (coin): ICoin => ({
                        id: coin.Id,
                        imageUrl: coin.ImageUrl,
                        name: coin.Name,
                        symbol: coin.Symbol,
                        coinName: coin.CoinName,
                        fullCoinName: coin.FullName,
                        description: coin.Description,
                        isTrading: coin.IsTrading,
                        price: null,
                        currency: null,
                        currencySymbol: null,
                    })
                );
            });
    }

    return {
        coinsList,
        fetchCoinsList,
    };
});
