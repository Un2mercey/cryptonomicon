<template>
    <section>
        <h5 class='text-h5'>
            {{ $t('forms.ticker') }}
        </h5>
        <v-text-field
            v-model="newTicker"
            :placeholder="$t('forms.newTicker')"
            class="mb-4 w-25 h-25"
        />
        <div class="d-flex mb-4">
            <v-btn
                :disabled="!newTicker.trim().length"
                @click="createNewTicker"
                class="mr-4"
            >
                {{ $t('buttons.add') }}
            </v-btn>
            <v-btn @click="deleteTicker"> delete last</v-btn>
        </div>
        <v-card>
            <v-card-item
                v-for="ticker of tickerList"
                :key="ticker.name"
            >
                <v-card-title>{{ ticker.name }}</v-card-title>
                <v-card-subtitle>{{ ticker.price }}</v-card-subtitle>
            </v-card-item>
        </v-card>
    </section>
</template>

<script setup lang="ts">
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
        price: 4000,
    });
    newTicker.value = '';
}

function deleteTicker() {
    removeTicker(tickerList.value.length - 1);
}
</script>
