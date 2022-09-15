<template>
    <header class="mb-4">
        <template v-if="currentUser">
            <h4 class="text-h4">{{ $t('notices.greetings') }}, {{ currentUser.name }}!</h4>
        </template>
        <template v-else>
            <div class="d-flex">
                <v-progress-circular
                    size="40"
                    class="mr-4"
                    color="red"
                    indeterminate
                />
                <h4 class="text-h4">
                    {{ $t('notices.fetching') }}
                </h4>
            </div>
        </template>
    </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/stores';

const { currentUser } = storeToRefs(useUsersStore());
</script>
