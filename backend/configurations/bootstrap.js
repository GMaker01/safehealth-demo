const uuid = require('node-uuid');
const cluster = require('cluster');
const os = require('os');
const initDB = require('../migration/init');
/*
 * @author Shubham
 * This program includes all the function which are required to  initialize before the application start
 */

// code to start the server Clustering of the Application
function bootApplication() {
    if (cluster.isMaster && process.env.ENABLE_CLUSTERING === 'true') {
        const cpuCount = os.cpus().length;
        // Create a worker for each CPU
        for (let i = 0; i < cpuCount; i += 1) {
            cluster.fork();
        }
    } else {
        app.listen(process.env.PORT, () => {
            /* eslint max-len: 0 */
            Logger.info(`Express server listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode, clustering ${process.env.ENABLE_CLUSTERING}`);
        });
    }

    process.on('uncaughtException', (err) => {
        Logger.error(`${(new Date()).toUTCString()} uncaughtException:`, err.message);
        Logger.error(err.stack);
        process.exit(1);
    });
}

async function createQuestions() {
    try {
        const question = await domain.Question.find();

        if (question && question.length > 0) return bootApplication();
        const data = await domain.Question.insertMany(initDB.getAllQuestions());

        await Promise.all(
            initDB.getAllQuestions().map(async (el) => {
                const quest = await domain.Question.findOne({ label: el.label });
                if (el.options) {
                    const options = await Promise.all(el.options.map(async (opt) => {
                        const findQuestion = await domain.Question.findOne({ label: opt.route_to_label });
                        return { ...opt, route_to: findQuestion.id };
                    }));
                    Object.assign(quest, { options });
                }

                if (el.can_skip) {
                    const canSkipTo = await Promise.all(el.can_skip_to.map(async (skip) => {
                        const findRouteAnswer = await domain.Question.findOne({ label: skip.answer_for_label });
                        const findRouteTo = await domain.Question.findOne({ label: skip.skip_to_label });
                        return { ...skip, answer_for: findRouteAnswer.id, skip_to: findRouteTo.id };
                    }));
                    Object.assign(quest, { can_skip_to: canSkipTo });
                }
               
                
                await domain.Question.findByIdAndUpdate(quest.id, quest);
            }),
        );

        if (data) {
            Logger.info('Migration Done');
            bootApplication();
        } else {
            Logger.error('Error in Migration');
        }
    } catch (err) {
        Logger.error('Error in Migration', err);
        if (global.Raven) global.Raven.captureException(JSON.stringify(err));
    }
    return null;
}

const initApp = () => {
    createQuestions();
};

module.exports.initApp = initApp;
