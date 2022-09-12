<template>
    <section class="d-flex justify-start align-start flex-wrap">
        <v-card
            v-for="ticker in tickerList"
            :key="ticker.name"
            variant="plain"
            class="ticker-card ma-4"
        >
            <v-card-item>
                <v-card-title>{{ ticker.name }} - {{ ticker.sym }}</v-card-title>
                <v-card-text>${{ ticker.price }}</v-card-text>
                <v-card-actions>
                    <v-btn
                        @click="removeTicker(ticker)"
                        color="warn"
                        outlined
                    >
                        {{ $t('buttons.remove') }}
                    </v-btn>
                </v-card-actions>
            </v-card-item>
        </v-card>
    </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ITicker } from '@/@interfaces';

type TickerListProps = {
    tickerList: ITicker[];
};

enum EMITS {
    REMOVE = 'remove'
}

type TickerListEmits = {
    (e: EMITS.REMOVE, ticker: ITicker): void,
}

const { tickerList = [] } = defineProps<TickerListProps>();
const emit = defineEmits<TickerListEmits>();

function removeTicker(ticker: ITicker): void {
    emit(EMITS.REMOVE, ticker);
}

</script>

<style scoped lang="scss">
.ticker-card {
    border-width: 1px;

    .v-card-item {
        padding: 0.8rem 1.5rem 0;

        .v-card-title {
            color: purple;
            text-shadow: 0px -3px 6px rgba(128, 0, 128, 0.2);
        }

        .v-card-text {
            padding: 24px 24px 20px;
            font-size: 1.2rem;
            justify-content: center;
            align-items: center;
            display: flex;
        }

        .v-card-actions {
            padding: 0;
            justify-content: center;
        }
    }
}
</style>
