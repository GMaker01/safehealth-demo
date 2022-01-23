const validate = require('express-validation');
const { each } = require('lodash');
const { camelize } = require('underscore.string');
const validationSchema = require('../../application/validations/index');
const middleware = require('../../middlewares/authentication');
const errorHandler = require('../../middlewares/error-handler');

module.exports = function (apiName, { controllers, views }, auth = null, skipApi = []) {
    const controller = controllers[`${camelize(apiName, true)}Controller`];
    const authentication = 'anonymous';

    views = { json: views.jsonView };

    const apis = {};
    apis[`/api/v1/${apiName}`] = [];

    each({
        GET: 'list',
        POST: 'create',
        PUT: 'update',
    }, (action, httpMethod) => {
        if (!skipApi.includes(action)) {
            apis[`/api/v1/${apiName}`].push({
                method: httpMethod,
                action: controller[action],
                middleware: [
                    middleware.auth(authentication),
                    validate(validationSchema.common[action]),
                    errorHandler,
                ],
                views,
            });
        }
    });

    each({
        'find-and-count': 'findAndCountAll',
        count: 'count',
        aggregate: 'aggregate',
        'aggregate-and-count': 'aggregateAndCount',
    }, (value, key) => {
        if (!skipApi.includes(value)) {
            apis[`/api/v1/${apiName}/${key}`] = [{
                method: ['aggregate', 'aggregate-and-count'].includes(key) ? 'POST' : 'GET',
                action: controller[value],
                middleware: [
                    middleware.auth(authentication),
                    validate(validationSchema.common[value]),
                    errorHandler,
                ],
                views,
            }];
        }
    });

    apis[`/api/v1/${apiName}/:id`] = [];

    each({
        GET: 'get',
        PATCH: 'update',
        PUT: 'update',
        DELETE: 'remove',
    }, (action, httpMethod) => {
        if (!skipApi.includes(action)) {
            apis[`/api/v1/${apiName}/:id`].push({
                method: httpMethod,
                action: controller[action],
                middleware: [
                    middleware.auth(authentication),
                    validate(validationSchema.common[action]),
                    errorHandler,
                ],
                views,
            });
        }
    });
    return apis;
};
