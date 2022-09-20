<template>
    <section>
        <h5 class="text-h5">Selected coin {{ ticker.name }}</h5>
        <div class="canvas">
            <template
                v-for="(bar, idx) in graph"
                :key="idx"
            >
                <div
                    class="amount"
                    :style="{ height: `${bar}%` }"
                ></div>
            </template>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Coin } from '@/@interfaces';

type TickerGraphProps = {
    ticker: Coin;
    amounts: number[];
};

const { ticker, amounts = [] } = defineProps<TickerGraphProps>();

const graph = computed(() => {
    console.log(amounts);
    const max = Math.max(...amounts);
    const min = Math.min(...amounts);
    return amounts.map((price) => 5 + ((price - min) * 95) / (max - min));
});
</script>

<style scoped lang="scss">
.canvas {
    border-left: 1px solid $spring-green-dark;
    border-bottom: 1px solid $spring-green-dark;
    display: flex;
    flex-direction: row;
    height: 300px;
    justify-content: flex-start;
    align-items: flex-end;

    .amount {
        background-color: map-get($green, 'dark');
        border: 1px solid map-get($green, 'base');
        max-height: 300px;
        width: 1vw;
    }
}
</style>
