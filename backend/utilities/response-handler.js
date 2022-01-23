const responseHandler = (res, responseObject, message, error, status1) => {
    res.status(status1).send({
        error,
        message,
        response: responseObject,
    });
    res.end();
};

module.exports = responseHandler;
