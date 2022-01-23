import * as types from './mutation-types';


export const updateLoader = ({ commit }, isLoading) => {
    commit(types.UPDATE_LOADER, isLoading);
};


export default {
    updateLoader,
};
