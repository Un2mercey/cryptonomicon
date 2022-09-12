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
                    v-model="newTicker"
                    :placeholder="$t('forms.newTicker')"
                    @keyup.enter="createNewTicker"
                    autofocus
                    hide-details
                    outlined
                />
            </v-col>
            <v-col>
                <v-btn
                    :disabled="!newTicker.trim().length"
                    @click="createNewTicker"
                    color="primary"
                    outlined
                >
                    {{ $t('buttons.add') }}
                </v-btn>
            </v-col>
        </v-row>
        <template v-if="tickerList.length">
            <v-divider class="mt-6 mb-2" />
            <v-row align="start">
                <v-col cols="12">
                    <TickerList
                        :ticker-list="tickerList"
                        :active-ticker-id="activeTicker?.id"
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
import { TickersStore, useTickersStore } from '@/stores';
import { Nullable } from '@/@types';
import { ICoin } from '@/@interfaces';
import { Currencies } from '@/utils';
import TickerList from './components/TickerList.vue';
import TickerGraph from './components/TickerGraph.vue';

const tickersStore: TickersStore = useTickersStore();
const { tickerList } = storeToRefs(tickersStore);
const { addTicker, fetchCurrencies, removeTicker } = tickersStore;

const newTicker: Ref<string> = ref('');
const activeTicker: Ref<Nullable<ICoin>> = ref(null);

let interval: Nullable<ReturnType<typeof setInterval>> = null;

watch(
    () => tickerList.value.length,
    () => {
        loadCurrencies();
    }
);

function createNewTicker(): void {
    addTicker(newTicker.value.trim().toLowerCase()).then(() => {
        newTicker.value = '';
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
    if (interval) {
        clearInterval(interval);
    }
    fetchCurrencies(Currencies.USD);
    interval = setInterval(() => {
        fetchCurrencies(Currencies.USD);
    }, 5000);
}
</script>

<style scoped lang="scss">
:deep(.v-field__input) {
    padding: 8px;
    min-height: 40px;
}
</style>
