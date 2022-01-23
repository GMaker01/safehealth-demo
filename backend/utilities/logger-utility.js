const winston = require('winston');

const logger = (winston.createLogger)({
    transports: [
        new (winston.transports.Console)({
            handleExceptions: true,
            json: true,
        }),
    ],
});

// winston.exceptions.handle(new winston.transports.File({
//     filename: 'logs/exception/exception.log',
// }));

logger.info('winston is working');

module.exports = logger;
