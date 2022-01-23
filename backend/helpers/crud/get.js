module.exports = async (req, res, model, callback) => {
    try {
        if (!req.params.id) throw new Error('Invalid Payload.Id not found');

        if (!global.mongoose.Types.ObjectId.isValid(req.params.id)) throw new Error('Invalid ObjectId');

        const item = await model.findById(req.params.id);

        return callback(null, item);
    } catch (err) {
        return callback(err);
    }
};
