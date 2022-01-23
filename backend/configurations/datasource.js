/**
 @author: Shubham Sharma
 configuration is define to make connection with the database for the different environment.
*/

// function to check connection to database server
function checkMongooseConnection(db) {
    mongoose.connection.on('open', (ref) => {
        Logger.info('Connected to mongo server.', ref);
        return db;
    });
    mongoose.connection.on('error', (err) => {
        Logger.error('Could not connect to mongo server!');
        Logger.error(err);
    });
}

function getDbConnection() {
    const url = process.env.NODE_ENV === 'development' ? process.env.DB_URI : process.env.DB_URI;
    const db = mongoose.connect(url);
    return checkMongooseConnection(db);
}

module.exports = getDbConnection;
