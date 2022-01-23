module.exports = async function (req, res, model, callback) {
    try {
        const { query } = req;

        const matchQuery = query.where;

        delete query.where;

        if (query.limit) query.limit = parseInt(query.limit);
        else query.limit = 10;
        if (query.offset) query.offset = parseInt(query.offset);
        else query.offset = 0;

        const { docs } = await model.paginate(matchQuery, query);

        return callback(null, docs);
    } catch (err) {
        return callback(err);
    }
};
