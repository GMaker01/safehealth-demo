import {
    ADDANSWERS,
    DELETEANSWERS,
    INIT
} from './mutation-types';

export default {
    [ADDANSWERS](state, answer) {
        state.answers.push(answer);
        localStorage.setItem('answers', JSON.stringify(state.answers));
    },
    [DELETEANSWERS](state) {
        state.answers.length = 0;
        localStorage.removeItem('answers');
    },
    [INIT](state) {
        const answers = JSON.parse(localStorage.getItem('answers'));
        if(answers && answers.length > 0) {
            state.answers = answers;
        }
    },
};
