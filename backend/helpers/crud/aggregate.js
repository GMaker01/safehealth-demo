const parseAggregateQuery = require('../utilities/parse-aggregate-query');

module.exports = async (req, res, model, callback) => {
    try {
        const { body: data } = req;

        console.log('query', data);

        if (!(data instanceof Array)) throw new Error('Invalid payload.Item should be an array');

        const parsedQuery = parseAggregateQuery(data);

        const item = await model.aggregate(parsedQuery);

        return callback(null, item);
    } catch (err) {
        return callback(err);
    }
};
