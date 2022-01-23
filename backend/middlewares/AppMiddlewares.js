const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { isObject } = require('lodash');
const compression = require('compression');

// Help to secure express app.
app.use(helmet());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Authorization,Content-Type,x-access-token');
    res.header('Access-Control-Max-Age', 86400);
    next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
}));

app.use(errorHandler());

app.use(express.static(`${BASE_PATH}/public`));

app.use(compression());
