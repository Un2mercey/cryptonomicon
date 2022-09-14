import { computed, watch } from 'vue';
import { Composer, useI18n } from 'vue-i18n';
import { RouteLocationNormalizedLoaded, RouteMeta, useRoute } from 'vue-router';

export default () => {
    const route: RouteLocationNormalizedLoaded = useRoute();
    const { t }: Composer = useI18n();

    const defaultKey: string = 'pages.default';
    const routeMeta = computed<RouteMeta>(() => route.meta);

    watch(routeMeta, (titleMeta: RouteMeta) => {
        document.title = titleMeta?.title && typeof titleMeta.title === 'string' ? t(titleMeta.title) : t(defaultKey);
    });
};
