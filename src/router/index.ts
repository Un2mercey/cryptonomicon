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
const Home: () => RouteView = (): RouteView => import('@/views/Home.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: RouteUrls.HOME,
        name: RouteNames.HOME,
        component: Home,
        meta: { title: 'pages.home' },
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
