<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import localizeTitles from '@/modules/localizeTitles';

localizeTitles();
</script>

<style scoped lang="scss"></style>
