import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@state/store';
import routes from './routes';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes,
    mode: 'history',
});

router.beforeEach((to, from, next) => {
    store.dispatch('loader/updateLoader', true);
    next();
});

router.afterEach(() => {
    store.dispatch('loader/updateLoader', false);
});

Vue.router = router;

export default router;
