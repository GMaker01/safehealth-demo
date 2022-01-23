import Vue from 'vue';
import lodash from 'lodash';

// Bind Lodash to Vue
Object.defineProperty(Vue.prototype, '$lodash', {
    get() {
        return lodash;
    },
});
