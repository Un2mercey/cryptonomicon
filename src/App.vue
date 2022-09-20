<template>
    <MainLayout>
        <HeaderLayout />
        <router-view #default="{ Component }">
            <transition name="fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </MainLayout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { localizeTitles } from '@/modules';
import { CoinsStore, UsersStore, useCoinsStore, useUsersStore } from '@/stores';
import { HeaderLayout, MainLayout } from '@/elements';

const { setUser, fetchUsers }: UsersStore = useUsersStore();
const { fetchCoins }: CoinsStore = useCoinsStore();

onBeforeMount(() => {
    localizeTitles();
    loadCoins();
    loadUsers();
});

async function loadUsers(): Promise<void> {
    await fetchUsers();
    console.info('Users fetched');
    setUser(1);
}

async function loadCoins(): Promise<void> {
    await fetchCoins();
    console.info('Coins fetched');
}
</script>

<style scoped lang="scss">
:deep(.v-btn--disabled) {
    pointer-events: all;
    cursor: not-allowed;
}
</style>
