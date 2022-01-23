import Axios from 'axios';
import state from '@state/store';
import Vue from 'vue';
import {
    stringify,
} from 'qs';

function createAxios () {
    const axios = Axios.create();

    axios.defaults.baseURL = process.env.VUE_APP_HOST + '/api/v1';
    /* eslint max-len: 0 */
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.timeout = 1000 * 60 * 5; // 5 mins before time out

    axios.interceptors.request.use(
        (conf) => {
            state.dispatch('loader/updateLoader', true);
            return conf;
        },
        (error) => {
            state.dispatch('loader/updateLoader', false);
            return Promise.reject(error);
        },
    );

    axios.interceptors.response.use(
        (response) => {
            state.dispatch('loader/updateLoader', false);
            return response;
        },
        (error) => {
            state.dispatch('loader/updateLoader', false);
            if (error && error.response && error.response.status === 401) {
                state.dispatch('auth/logout');
            }
            return Promise.reject(error.response.data);
        },
    );
    return axios;
}

// Initialise Axios
const api = createAxios();

const service = {

    getHeaders () {
        return {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('x-access-token'),
        };
    },
    // POST services
    async postWithoutHeaders (route, body) {
        const {
            data,
        } = await api.post(route, body);
        return Promise.resolve(data);
    },

    async post (path, payload) {
        const headers = this.getHeaders();

        const {
            data,
        } = await api.post(path, payload, {
            headers,
        });

        return Promise.resolve(data.object);
    },
    // GET services
    async getById (route, id) {
        const headers = this.getHeaders();
        const {
            data,
        } = await api.get(`${route}/${id}`, {
            headers,
        });
        return Promise.resolve(data.object);
    },

    async get (route, query = {}, shouldAppendV2 = false) {
        if (shouldAppendV2) {
            Object.assign(query, {
                apiVersion: 'v2',
            });
        }
        const headers = this.getHeaders();
        const {
            data,
        } = await api.get(`${route}?${stringify(query)}`, {
            headers,
        });
        return Promise.resolve(data.object);
    },

    // Get File
    async getFile (path, payload = {}) {
        const headers = this.getHeaders();
        const {
            data,
        } = await api.post(path, payload, {
            headers,
            responseType: 'blob',
        });
        return Promise.resolve(data);
    },


    async getWithoutHeaders (route) {
        const {
            data,
        } = await api.get(route);
        return Promise.resolve(data);
    },

    // PUT services
    async rawPut (path, payload) {
        return api.put(path, payload);
    },

    async updateById (route, id, body) {
        const headers = this.getHeaders();
        const {
            data,
        } = await api.put(`${route}/${id}`, body, {
            headers,
        });
        return Promise.resolve(data.object);
    },

    async updateOrCreate (route, body) {
        const headers = this.getHeaders();

        // Feedback already exists, so update
        let response;
        if (body.id) {
            response = await this.updateById(route, body.id, body, {
                headers,
            });
        } else {
            response = await this.rawPost(route, body, {
                headers,
            });
        }

        return Promise.resolve(response);
    },

    // PATCH services
    async update (route, body) {
        const headers = this.getHeaders();
        const {
            data,
        } = await api.patch(`${route}`, body, {
            headers,
        });
        return Promise.resolve(data);
    },

    // DELETE services
    async delete (route, id) {
        const headers = this.getHeaders();
        return api.delete(`${route}/${id}`, {
            headers,
        });
    },

    // Generic
    async instanceMethod (route, id, action, {
        method,
        payload,
    } = {
            method: 'get',
        }) {
        const headers = this.getHeaders();
        const args = [{
            headers,
        }];
        // Add the payload to the arguments for poast requests
        if (payload) {
            args.unshift(payload);
        }
        const {
            data,
        } = await api[method](`${route}/${id}/${action}`, ...args);
        return Promise.resolve(data);
    },

    // Bulk operations
    async bulkCreate (path, items) {
        const headers = this.getHeaders();
        const newItems = [];

        items.forEach(async (item) => {
            const {
                data,
            } = await api.post(path, item, {
                headers,
            });

            newItems.push(data.object);
        });
        return Promise.resolve(newItems);
    },

    async bulkUpdateOrCreate (route, items) {
        const headers = this.getHeaders();
        const newItems = [];

        items.forEach(async (item) => {
            let response = null;

            if (item.id) {
                response = await this.updateById(route, item.id, item, {
                    headers,
                });
            } else {
                response = await this.rawPost(route, item, {
                    headers,
                });
            }
            newItems.push(response);
        });
        return Promise.resolve(newItems);
    },
};

// Bind Axios to Vue$
Vue.$http = service;
Object.defineProperty(Vue.prototype, '$http', {
    get () {
        return service;
    },
});

export default service;
