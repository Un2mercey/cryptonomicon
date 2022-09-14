<template>
    <section>
        <h5 class="text-h5">Selected coin {{ ticker.name }}</h5>
        <template
            v-for="(amount, index) in amounts"
            :key="index"
        >
            <span>{{ amount }}</span>
        </template>
    </section>
</template>

<script setup lang="ts">
import { ICoin } from '@/@interfaces';

type TickerGraphProps = {
    ticker: ICoin;
    amounts: number[];
};

const { ticker, amounts } = defineProps<TickerGraphProps>();
</script>

<style scoped lang="scss"></style>
