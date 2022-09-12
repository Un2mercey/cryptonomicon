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
        <template v-if='tickerList.length'>
            <v-divider class="mt-6 mb-2" />
            <v-row align="start">
                <v-col cols="12">
                    <TickerList
                        :ticker-list="tickerList"
                        @remove='removeTicker'
                    />
                </v-col>
            </v-row>
            <v-divider class="mt-2 mb-6" />
        </template>
    </v-container>
</template>

<script setup lang="ts">
import TickerList from './components/TickerList.vue';
import { Ref, ref } from 'vue';
import { TickersStore, useTickersStore } from '@/stores';
import { storeToRefs } from 'pinia';

const tickersStore: TickersStore = useTickersStore();
const { tickerList } = storeToRefs(tickersStore);
const { addTicker, removeTicker } = tickersStore;

const newTicker: Ref<string> = ref('');

function createNewTicker() {
    addTicker({
        name: newTicker.value.trim(),
        price: Math.round(Math.random() * 1000),
        sym: 'USD'
    });
    newTicker.value = '';
}

</script>

<style scoped lang="scss">
:deep(.v-field__input) {
    padding: 8px;
    min-height: 40px;
}
</style>
