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
                    :disabled="!isCoinsFetched"
                    :loading="!isCoinsFetched"
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
                        @remove="onRemoveTicker"
                        @select="onSelectTicker"
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
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { Nullable, SetInterval } from '@/@types';
import { Coin } from '@/@interfaces';
import { CoinsStore, useCoinsStore } from '@/stores';
import { Currencies } from '@/utils';
import TickerGraph from './components/TickerGraph.vue';
import TickerList from './components/TickerList.vue';

const coinsStore: CoinsStore = useCoinsStore();
const { tickers, isCoinsFetched } = storeToRefs<CoinsStore>(coinsStore);
const { fetchCoinPrices, addTicker, removeTicker }: CoinsStore = coinsStore;

const newTickerName = ref<string>('');
const activeTicker = ref<Nullable<Coin>>(null);

let interval: SetInterval = null;

watch(
    () => tickers.value.length,
    (value: number) => {
        if (interval) clearInterval(interval);
        if (value) loadTickersPrices();
        else interval = null;
    },
);

function createNewTicker(): void {
    addTicker(newTickerName.value.trim()).then(() => {
        newTickerName.value = '';
    });
}

function onRemoveTicker(ticker: Coin): void {
    if (activeTicker.value?.name === ticker.name) {
        activeTicker.value = null;
    }

    removeTicker(ticker);
}

function onSelectTicker(ticker: Coin): void {
    if (activeTicker.value?.name === ticker.name) {
        activeTicker.value = null;
        return;
    }

    activeTicker.value = ticker;
}

function loadTickersPrices(): void {
    fetchCoinPrices(Currencies.USD);
    interval = setInterval(() => {
        fetchCoinPrices(Currencies.USD);
    }, 5000);
}
</script>

<style scoped lang="scss">
:deep(.v-field__input) {
    padding: 8px;
    min-height: 40px;
}
</style>
