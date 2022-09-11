<template>
    <section>
        <h1>{{ $t('forms.ticker') }}</h1>
        <v-text-field v-model="newTicker" outlined />
        <v-btn>{{ $t('buttons.add') }}</v-btn>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const newTicker = ref<string>('');
</script>

<style lang="scss" scoped></style>
