const setOptions = require('../utilities/set-options');

module.exports = async (req, res, model, callback) => {
    try {
        if (!req.params.id) throw new Error('Invalid Payload.Id not found');

        if (!global.mongoose.Types.ObjectId.isValid(req.params.id)) throw new Error('Invalid ObjectId');

        delete req.body.id;
        delete req.body.password;
        delete req.body.salt;

        item = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return callback(null, item);
    } catch (err) {
        return callback(err);
    }
};
