const parseAggregateQuery = require('../utilities/parse-aggregate-query');

/**
 * Request object
 * {
 *      aggregate : [],
 *      option : {
 *          skip: 10,
 *          limit: 10
 *      }
 * }
 */
module.exports = async (req, res, model, callback) => {
    try {
        const { body: data } = req;

        if (!(data.aggregate instanceof Array)) throw new Error('Invalid payload.Item should be an array');

        const parsedQuery = parseAggregateQuery(data.aggregate);

        if (data.option) {
            parsedQuery.push({
                $facet: {
                    metadata: [{ $count: 'count' }],
                    data: [{ $skip: parseInt(data.option.skip, 10) }, { $limit: parseInt(data.option.limit, 10) }], // add projection here wish you re-shape the docs
                },
            });
        }

        const item = await model.aggregate(parsedQuery);

        return callback(null, item);
    } catch (err) {
        return callback(err);
    }
};
