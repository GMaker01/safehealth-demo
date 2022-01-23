const setOptions = require('../utilities/set-options');

module.exports = async function (req, res, model, callback) {
    try {
        if (!req.params.id) throw new Error('Invalid Payload.Id not found');

        if (!global.mongoose.Types.ObjectId.isValid(req.params.id)) throw new Error('Invalid ObjectId');

        const item = await model.findById(req.params.id);

        if (!item) throw new Error('Item not found.');

        const deletedItem = await model.findByIdAndDelete(req.params.id);

        console.log('deletedItem', deletedItem);

        deletedItem.remove();

        return callback(null, item);
    } catch (err) {
        return callback(err);
    }
};
