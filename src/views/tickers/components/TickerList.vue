<template>
    <section class="d-flex justify-start align-start flex-wrap">
        <template
            v-for="ticker in tickers"
            :key="ticker.name"
        >
            <v-card
                @click="selectTicker(ticker)"
                variant="plain"
                class="ticker-card ma-4"
                :class="{ selected: ticker.name === activeTicker }"
            >
                <template v-if="getTickerLastPrice(ticker.name)">
                    <v-card-item>
                        <v-card-title class="d-flex justify-center">
                            {{ ticker.name }} - {{ ticker.currency }}
                        </v-card-title>
                        <v-card-text>
                            {{ CurrencySymbol[ticker.currency] }}
                            {{ getPrice(getTickerLastPrice(ticker.name)) }}
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
                </template>
                <template v-else>
                    <v-card-item>
                        <v-card-title class="d-flex justify-center">
                            {{ ticker.name }}
                        </v-card-title>
                        <v-card-text class="pb-2">
                            <v-progress-circular
                                color="#800080FF"
                                size="80"
                                indeterminate
                            />
                        </v-card-text>
                    </v-card-item>
                </template>
            </v-card>
        </template>
    </section>
</template>

<script setup lang="ts">
import { ICoin } from '@/@interfaces';
import { CoinName, Nullable, Undefined } from '@/@types';
import { CoinsStore, useCoinsStore } from '@/stores';
import { CurrencySymbol } from '@/utils';

type TickerListProps = {
    tickers: ICoin[];
    activeTicker: Nullable<CoinName>;
};

enum EMITS {
    REMOVE = 'remove',
    SELECT = 'select',
}

type TickerListEmits = {
    (e: EMITS.REMOVE, ticker: ICoin): void;
    (e: EMITS.SELECT, ticker: ICoin): void;
};

const { getTickerLastPrice }: CoinsStore = useCoinsStore();

const { tickers = [], activeTicker } = defineProps<TickerListProps>();
const emit = defineEmits<TickerListEmits>();

function removeTicker(ticker: ICoin): void {
    emit(EMITS.REMOVE, ticker);
}

function selectTicker(ticker: ICoin): void {
    emit(EMITS.SELECT, ticker);
}

function getPrice(price: Undefined<number>): string {
    return (price && (price > 1 ? price.toFixed(2) : price.toPrecision(2))) || '';
}
</script>

<style scoped lang="scss">
.ticker-card {
    border-width: 1px;

    &.selected {
        border-color: purple;
    }

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
