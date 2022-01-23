const mongoosePaginate = require('mongoose-paginate');
const insertManyByDate = require('../configurations/mongoose-plugins/insert-many-by-date');

// add plugin to all models
global.mongoose.plugin(mongoosePaginate);
global.mongoose.plugin(insertManyByDate);

global.domain = {};

domain.Question = require('../application/models/question/index.js');
domain.Answer = require('../application/models/answer/index.js');

module.exports = domain;
