var BaseExpressView = require('../../../configurations/layers/layers').BaseExpressView,
    errorView = new ErrorView();

BaseView = function() {};

BaseView.prototype = new BaseExpressView();

BaseView.prototype.getRenderParameters = function(result) {
    var self = this;
    return {
        locals: {
            title: self.getTitle(result),
            section: self.getSection(),
            result: result
        }
    };
};

BaseView.prototype.getErrorView = function() {
    return errorView;
};


BaseView.prototype.getTitle = function(result) {
    if (result && result.title) {
        return result.title;
    }
};

BaseView.prototype.toString = function() {
    return this.getTitle();
};

module.exports = BaseView;
