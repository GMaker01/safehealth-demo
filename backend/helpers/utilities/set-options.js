module.exports = (req, idFieldName, options) => {
    if (!options) options = {};

    if (!idFieldName) idFieldName = '_id';

    options[idFieldName] = req.params.id;

    return options;
};
