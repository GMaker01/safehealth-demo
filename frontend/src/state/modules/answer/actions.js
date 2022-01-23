/* ============
 * Actions for the answer module
 * ============
 *
 * The actions that are available on the
 * answer module.
 */

import * as types from './mutation-types';

export const addAnswers = ({ commit }, answers) => {
    commit(types.ADDANSWERS, answers);
};

export const deleteAnswers = ({ commit }) => {
    commit(types.DELETEANSWERS);
};

export const init = ({ commit }) => {
    commit(types.INIT);
};


export default {
    addAnswers,
    deleteAnswers,
    init
};

