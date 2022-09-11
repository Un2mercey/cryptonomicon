import { computed, ComputedRef, watch } from 'vue';
import { RouteMeta, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default () => {
    const route = useRoute();
    const { t } = useI18n();

    const defaultKey: string = 'pages.default';

    const routeMeta: ComputedRef<RouteMeta> = computed(() => route.meta);

    watch(routeMeta, (titleMeta: RouteMeta) => {
        document.title = titleMeta?.title && typeof titleMeta.title === 'string' ? t(titleMeta.title) : t(defaultKey);
    });
};
