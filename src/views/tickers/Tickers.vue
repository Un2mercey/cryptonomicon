<template>
    <v-container
        fluid
        class="pa-0"
    >
        <v-row no-gutters>
            <v-col cols="12">
                <h5 class="text-h5 pb-4">
                    {{ $t('pages.tickers') }}
                </h5>
            </v-col>
        </v-row>
        <v-row
            align="center"
            no-gutters
        >
            <v-col
                cols="2"
                class="pr-6"
            >
                <v-text-field
                    v-model="newTickerName"
                    :disabled="!coins.length"
                    :placeholder="$t('forms.newTicker')"
                    @keyup.enter="createNewTicker"
                    autofocus
                    hide-details
                    outlined
                />
            </v-col>
            <v-col>
                <v-btn
                    :disabled="!newTickerName.trim().length"
                    @click="createNewTicker"
                    color="primary"
                    outlined
                >
                    {{ $t('buttons.add') }}
                </v-btn>
            </v-col>
        </v-row>
        <template v-if="tickers.length">
            <v-divider class="mt-6 mb-2" />
            <v-row align="start">
                <v-col cols="12">
                    <TickerList
                        :tickers="tickers"
                        :active-ticker="activeTicker?.name"
                        @remove="removeTicker"
                        @select="selectTicker"
                    />
                </v-col>
            </v-row>
            <v-divider class="mt-2 mb-6" />
        </template>
        <template v-if="activeTicker">
            <TickerGraph :ticker="activeTicker" />
        </template>
    </v-container>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { CoinsStore, useCoinsStore } from '@/stores';
import { Nullable } from '@/@types';
import { ICoin } from '@/@interfaces';
import { Currency } from '@/utils';
import TickerList from './components/TickerList.vue';
import TickerGraph from './components/TickerGraph.vue';

const coinsStore: CoinsStore = useCoinsStore();
const { tickers, coins } = storeToRefs<CoinsStore>(coinsStore);
const { fetchCoinsPrices, addTicker, removeTicker } = coinsStore;

const newTickerName: Ref<string> = ref('');
const activeTicker: Ref<Nullable<ICoin>> = ref(null);

let interval: Nullable<ReturnType<typeof setInterval>> = null;

watch(
    () => tickers.value.length,
    (value: number) => {
        value > 0 ? loadCurrencies() : clearInterval(interval!);
    }
);

function createNewTicker(): void {
    addTicker(newTickerName.value.trim()).then(() => {
        newTickerName.value = '';
    });
}

function selectTicker(ticker: ICoin): void {
    if (activeTicker.value?.name === ticker.name) {
        activeTicker.value = null;
        return;
    }

    activeTicker.value = ticker;
}

function loadCurrencies(): void {
    if (interval !== null) {
        clearInterval(interval);
    }
    fetchCoinsPrices(Currency.USD);
    interval = setInterval(() => {
        fetchCoinsPrices(Currency.USD);
    }, 5000);
}
</script>

<style scoped lang="scss">
:deep(.v-field__input) {
    padding: 8px;
    min-height: 40px;
}
</style>
