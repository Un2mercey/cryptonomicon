import {
    RouteComponent,
    RouteLocationNormalized,
    RouteRecordRaw,
    Router,
    createRouter,
    createWebHistory,
} from 'vue-router';
import { RouteNames, RouteUrls } from './routeUrls';

type RouteView = Promise<RouteComponent>;
const Tickers: () => RouteView = (): RouteView => import('@/views/tickers/Tickers.vue');

const routes: RouteRecordRaw[] = [
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
