import {
    UPDATE_LOADER,
} from './mutation-types';

export default {
    [UPDATE_LOADER](state, isLoading = false) {
        state.isLoading = isLoading;
    },
    // [UPDATE](state, { jobs = [], candidates = [] }) {
    //     if (jobs && jobs.length) state.jobKeywords = jobs;
    //     if (candidates && candidates.length) state.candidatesKeywords = candidates;
    //     // Object.keys(user).forEach((k) => {
    //     //     Vue.set(state.user, k, user[k]);
    //     // });
    // },
};
