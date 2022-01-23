var BaseView = require('./BaseView');

JsonView = function () {};

JsonView.prototype = new BaseView();

JsonView.prototype.render = function (req, res, result) {
	var date = new Date();
	res.send({
		error: false,
		object: result,
		message: "",
		extendedMessage: "",
		status: 200,
		timeStamp: date.getTime()
	});
};

module.exports = new JsonView;
