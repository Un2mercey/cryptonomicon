<template>
    <section>
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
        <h2>
            {{ $t('forms.ticker') }}
        </h2>
        <v-text-field
            v-model="newTicker"
            outlined
            class="mb-4 w-25 h-25"
        />
        <div class="d-flex mb-4">
            <v-btn
                :disabled="!newTicker.trim().length"
                @click="createNewTicker"
                class="mr-4"
            >
                {{ $t('buttons.add') }}
            </v-btn>
            <v-btn @click="deleteTicker"> delete last</v-btn>
        </div>
        <v-card>
            <v-card-item
                v-for="ticker of tickerList"
                :key="ticker.name"
            >
                <v-card-title>{{ ticker.name }}</v-card-title>
                <v-card-subtitle>{{ ticker.price }}</v-card-subtitle>
            </v-card-item>
        </v-card>
    </section>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { TickersStore, useTickersStore, UsersStore, useUsersStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { IUser } from '@/@interfaces';

const tickersStore: TickersStore = useTickersStore();
const { tickerList } = storeToRefs(tickersStore);
const { addTicker, removeTicker } = tickersStore;

const usersStore: UsersStore = useUsersStore();
const { currentUser } = storeToRefs(usersStore);
const { setUser, fetchUsers } = usersStore;

const newTicker: Ref<string> = ref('');

onMounted(async () => {
    const fetchedUsers: IUser[] = await fetchUsers();
    if (fetchedUsers.length) {
        setUser(fetchedUsers[0]);
    }
});

function createNewTicker() {
    addTicker({
        name: newTicker.value.trim(),
        price: 4000,
    });
    newTicker.value = '';
}

function deleteTicker() {
    removeTicker(tickerList.value.length - 1);
}
</script>
