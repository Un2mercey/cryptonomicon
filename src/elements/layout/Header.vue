<template>
    <header class="mb-4">
        <template v-if="currentUser">
            <h1>
                {{ $t('notices.greetings') }},
                {{ currentUser.lastName }}
                {{ currentUser.firstName }}
            </h1>
        </template>
        <template v-else>
            <div class="d-flex">
                <v-progress-circular
                    size="40"
                    class="mr-4"
                    color="red"
                    indeterminate
                />
                <h1>
                    {{ $t('notices.fetching') }}
                </h1>
            </div>
        </template>
    </header>
</template>

<script setup lang="ts">
import { UsersStore, useUsersStore } from '@/stores';
import { storeToRefs } from 'pinia';

const usersStore: UsersStore = useUsersStore();
const { currentUser } = storeToRefs(usersStore);
</script>
