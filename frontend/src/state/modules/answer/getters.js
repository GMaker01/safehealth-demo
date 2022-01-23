/* ============
 * Getters for the auth module
 * ============
 *
 * The getters that are available on the
 * auth module.
 */

export default {
    getAnswers: state => state.answers,
    getAnswer: state => (question) => state.answers.find(x => x.question === question),
};
