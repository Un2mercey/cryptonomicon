<template>
    <section>
        <h5 class="text-h5">Selected coin {{ ticker.name }}</h5>
    </section>
</template>

<script setup lang="ts">
import { ICoin } from '@/@interfaces';

type TickerGraphProps = {
    ticker: ICoin;
};

const { ticker } = defineProps<TickerGraphProps>();
</script>

<style scoped lang="scss"></style>
