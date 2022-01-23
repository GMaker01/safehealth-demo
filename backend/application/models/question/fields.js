const OptionsRule = new MongooseSchema(
    {
        label: {
            type: String,
            required: true,
            default: 'default',
        },
        value: {
            type: String,
            required: true,
        },
        route_to: {
            type: MongooseSchema.ObjectId,
            ref: 'question',
        },
    },
);

const SkipRule = new MongooseSchema(
    {
        answer_for: {
            type: MongooseSchema.ObjectId,
            ref: 'question',
        },
        for_value: {
            type: String,
            required: true,
        },
        skip_to: {
            type: MongooseSchema.ObjectId,
            ref: 'question',
        },
    },
);

module.exports = {
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['text', 'radio', 'select', 'checkbox', 'search-multiple-select', 'button'],
        default: 'text',
    },
    placeholder: {
        type: String,
    },
    validation: {
        type: String,
    },
    is_required: {
        type: Boolean,
        default: true,
    },
    can_skip: {
        type: Boolean,
        default: false,
    },
    can_skip_to: {
        type: [SkipRule],
    },
    options: {
        type: [OptionsRule],
    },
};
