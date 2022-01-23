/* eslint no-unused-vars:0 */

module.exports = (err, req, res, next) => {
    res.status(err.status).send({
        error: true,
        object: err.errors[0].messages,
        errorType: err.message,
        message: err.statusText,
        timeStamp: new Date().getTime(),
    }).end();
};