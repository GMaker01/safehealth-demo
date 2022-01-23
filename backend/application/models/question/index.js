const fields = require('./fields');



const QuestionSchema = new MongooseSchema(fields, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

module.exports = mongoose.model('question', QuestionSchema);
