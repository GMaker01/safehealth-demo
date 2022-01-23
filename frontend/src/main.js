import Vue from 'vue'
import App from './App.vue'
import router from '@router';
import store from '@state/store';
import '@services/index';
import '@src/plugins/index';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

store.dispatch('answer/init');

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
