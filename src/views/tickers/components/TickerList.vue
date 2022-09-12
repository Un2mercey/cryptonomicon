<template>
    <section class="d-flex justify-start align-start flex-wrap">
        <template
            v-for="ticker in tickerList"
            :key="ticker.id"
        >
            <v-card
                @click="selectTicker(ticker)"
                variant="plain"
                class="ticker-card ma-4"
            >
                <v-card-item>
                    <v-card-title class="d-flex justify-center">
                        {{ ticker.name }}
                        {{ ticker.currency ? ` - ${ticker.currency}` : '' }}
                    </v-card-title>
                    <v-card-text v-if="ticker.price">
                        {{ ticker.currencySymbol }}
                        {{ getPrice(ticker.price) }}
                    </v-card-text>
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
        </template>
    </section>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ICoin } from '@/@interfaces';

type TickerListProps = {
    tickerList: ICoin[];
};

enum EMITS {
    REMOVE = 'remove',
    SELECT = 'select',
}

type TickerListEmits = {
    (e: EMITS.REMOVE, ticker: ICoin): void;
    (e: EMITS.SELECT, ticker: ICoin): void;
};

const { tickerList = [] } = defineProps<TickerListProps>();
const emit = defineEmits<TickerListEmits>();

function removeTicker(ticker: ICoin): void {
    emit(EMITS.REMOVE, ticker);
}

function selectTicker(ticker: ICoin): void {
    emit(EMITS.SELECT, ticker);
}

function getPrice(price: number): string {
    return price > 1 ? price.toFixed(2) : price.toPrecision(2);
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
