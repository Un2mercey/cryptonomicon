<template>
    <section>
        <h1>{{ $t('forms.ticker') }}</h1>
        <v-text-field v-model="newTicker" outlined />
        <v-btn @click="newTicker.trim().length && createNewTicker()">
            {{ $t('buttons.add') }}
        </v-btn>
        <v-btn @click="deleteTicker">
            delete last
        </v-btn>
        <ul>
            <li v-for="ticker of tickerList" :key="ticker.name">
                {{ ticker.name }} {{ ticker.price }}
            </li>
        </ul>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useTickersStore} from "@/stores/TickersStore";
import {storeToRefs} from "pinia";

const tickersStore = useTickersStore();
const { tickerList } = storeToRefs(tickersStore);
const { addTicker, removeTicker } = tickersStore;

const newTicker = ref<string>('');

function createNewTicker() {
    addTicker({
        name: newTicker.value.trim(),
        price: 4000,
    });
    newTicker.value = '';
}

function deleteTicker() {
    removeTicker(tickerList.value.length - 1);
}

</script>
