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
import MainLayout from '@/elements/layout/MainLayout.vue';
import Header from '@/elements/layout/Header.vue';
import localizeTitles from '@/modules/localizeTitles';
import { onMounted } from 'vue';
import { IUser } from '@/@interfaces';
import { UsersStore, useUsersStore } from '@/stores';

const usersStore: UsersStore = useUsersStore();
const { setUser, fetchUsers } = usersStore;

onMounted(async () => {
    localizeTitles();
    const fetchedUsers: IUser[] = await fetchUsers();
    if (fetchedUsers.length) {
        setUser(fetchedUsers[0]);
    }
});
</script>

<style scoped lang="scss">
:deep(.v-btn--disabled) {
    pointer-events: all;
    cursor: not-allowed;
}
</style>
