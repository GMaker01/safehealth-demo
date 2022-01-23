const { forEach } = require('lodash');

module.exports = (pipelines) => {
    const parsedQuery = pipelines.map((pipeline) => {
        if (pipeline.$match) {
            forEach(pipeline.$match, (value, key) => {
                if (typeof value === 'string' && value && value.toString().includes('{{')) {
                    const parsedValue = value.replace(/[{}]/g, '');
                    pipeline.$match[key] = mongoose.Types.ObjectId(parsedValue);
                } else {
                    pipeline.$match[key] = value;
                }
            });
        }
        return pipeline;
    });

    return parsedQuery;
};
