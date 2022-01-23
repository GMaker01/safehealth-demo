/* eslint-disable camelcase */
module.exports = async (req, res, model, callback) => {
    try {
        const item = req.body;
        let newItem = null;

        if ((item instanceof Array)) {
            newItem = await model.insertManyByDate(item);
        } else {
            newItem = await model.create(item);
        }
        return callback(null, newItem);
    } catch (err) {
        return callback(err);
    }
};
