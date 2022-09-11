import { createRouter, createWebHistory, RouteRecordRaw, Router, RouteComponent } from 'vue-router';
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

export default router;
