<template>
    <MainLayout>
        <router-view #default="{ Component }">
            <transition name="fade">
                <component :is="Component"/>
            </transition>
        </router-view>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/elements/layout/MainLayout.vue';
import localizeTitles from '@/modules/localizeTitles';

localizeTitles();
</script>
