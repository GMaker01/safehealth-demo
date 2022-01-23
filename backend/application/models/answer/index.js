const fields = require('./fields');

const AnswerSchema = new MongooseSchema(fields, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

module.exports = mongoose.model('answer', AnswerSchema);
