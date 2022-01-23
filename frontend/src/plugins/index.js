import Vue from 'vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-chalk/index.css';

/** Import packages */
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import ElementUILang from 'element-ui/lib/locale/lang/en';
import ElementUILocale from 'element-ui/lib/locale';
import VuexRouterSync from 'vuex-router-sync';
import store from '@state/store.js';
import { router } from '@router/index';

import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';

// configure language
ElementUILocale.use(ElementUILang);


Vue.use(ElementUI);
Vue.use(Vuex);
VuexRouterSync.sync(store, router);
// Change the field bag name of vee validate because it conflicts with element ui forms
const VeeValidateConfig = {
    fieldsBagName: 'veeValidateFields',
    inject: false,
};

Vue.use(VeeValidate, VeeValidateConfig);
Vue.use(BootstrapVue);

// global components
import FormFieldInput from '@components/form-field-input';
import FormField from '@components/form-field';
import FormHelp from '@components/form-help';

Vue.component('form-field-input', FormFieldInput);
Vue.component('form-field', FormField);
Vue.component('form-help', FormHelp);