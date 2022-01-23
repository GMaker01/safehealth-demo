const setEndpoint = require('../helpers/utilities/set-endpoint');
const {
    merge,
} = require('lodash');


module.exports = function (app) {
    const questionApis = setEndpoint('question', app);

    const answerApis = setEndpoint('answer', app);

    return merge( questionApis, answerApis);
};
