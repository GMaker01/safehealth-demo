const helpers = requireDirectory(module, '../../../helpers');
module.exports = (function () {
    const create = function (req, res, callback) {
        helpers.crud.create(req, res, domain.Question, callback);
    };

    const get = function (req, res, callback) {
        helpers.crud.get(req, res, domain.Question, 'id', callback);
    };

    const list = function (req, res, callback) {
        helpers.crud.list(req, res, domain.Question, callback);
    };

    const update = function (req, res, callback) {
        helpers.crud.update(req, res, domain.Question, 'id', callback);
    };

    const remove = function (req, res, callback) {
        helpers.crud.delete(req, res, domain.Question, callback);
    };

    const findAndCountAll = function (req, res, callback) {
        helpers.crud.findAndCountAll(req, res, domain.Question, callback);
    };

    return {
        create,
        get,
        list,
        update,
        remove,
        findAndCountAll,
    };
}());
