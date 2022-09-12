<template>
    <v-app>
        <v-main>
            <slot name="header" />
            <slot />
        </v-main>
    </v-app>
</template>

<style scoped lang="scss">
main.v-main {
    padding: 24px;
}
</style>
