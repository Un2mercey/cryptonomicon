import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
    Router,
    RouteComponent,
    RouteLocationNormalized,
} from 'vue-router';
import { RouteUrls, RouteNames } from './route-urls';

type RouteView = Promise<RouteComponent>;
const Tickers: () => RouteView = (): RouteView => import('@/views/tickers/Tickers.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: RouteUrls.HOME,
        name: RouteNames.HOME,
        component: Tickers,
        meta: {
            title: 'pages.tickers',
        },
    },
];

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (route: RouteLocationNormalized) => {
    // TODO: check auth
});

export default router;
