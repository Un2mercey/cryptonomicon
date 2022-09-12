<template>
    <MainLayout>
        <Header />
        <router-view #default="{ Component }">
            <transition name="fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </MainLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { IUser } from '@/@interfaces';
import { CoinsStore, UsersStore, useUsersStore, useCoinsStore } from '@/stores';
import localizeTitles from '@/modules/localizeTitles';
import MainLayout from '@/elements/layout/MainLayout.vue';
import Header from '@/elements/layout/Header.vue';

const usersStore: UsersStore = useUsersStore();
const { setUser, fetchUsers } = usersStore;

const coinsStore: CoinsStore = useCoinsStore();
const { fetchCoinsList } = coinsStore;

onMounted(() => {
    localizeTitles();
    loadCoins();
    loadUsers();
});

async function loadUsers(): Promise<void> {
    const fetchedUsers: IUser[] = await fetchUsers();
    if (fetchedUsers.length) {
        setUser(fetchedUsers[0]);
    }
}

async function loadCoins(): Promise<void> {
    console.info("Fetching coins");
    await fetchCoinsList();
    console.info("Coins fetched");
}
</script>

<style scoped lang="scss">
:deep(.v-btn--disabled) {
    pointer-events: all;
    cursor: not-allowed;
}
</style>
