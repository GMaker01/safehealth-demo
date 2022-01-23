ErrorView = function (options) {
    var defaults = {
        showStack: false,
        showMessage: false
    };
    for (var p in options) {
        defaults[p] = options[p];
    }
    this.title = "Error";
    this.options = defaults;
};


ErrorView.prototype.render = function (req, res, error) {
    this.getErrorOutput(error, function (outError) {
        var date = new Date();
        res.send({
            error: true,
            object: {
                message: outError.errors? outError.errors[0].message: '',
            },
            message: outError.message,
            extendedMessage: outError.errors,
            timeStamp: date.getTime(),
            status: outError.status
        }, outError.status)
    });
}

ErrorView.prototype.getErrorOutput = function (error, callback) {
    if (global.Raven) global.Raven.captureException(JSON.stringify(error));

    if (process.env.ENABLE_EXPRESS_LOG === 'true') console.log(error);

    if (!error.status)  error.status = 500;

    if (!error.message) error.message = configHolder.messages.error.internalServerError;

    if (!this.options.showStack || !this.options.dumpExceptions)  delete error.stack;

    callback(error);
};

module.exports = new ErrorView();
