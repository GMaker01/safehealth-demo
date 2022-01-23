const jwt = require('jsonwebtoken');

module.exports = (() => {
    // find User and its role using authenticationToken.
    function canAccess(userRole, accessLevel) {
        const levels = configHolder.config.accessLevels;
        return levels[accessLevel].includes(userRole);
    }

    /*
     *  call as middleware to decide the accessiblity of the function for the loggedIn user
     *  find user by AuthenticationToken
     *  Decide based on the role of user and accesslevel whether user is authorized or not
     */
    function auth(accessLevel) {
        return async (req, res, next) => {
            const token = req.get('x-access-token') || null;
            try {
                if (accessLevel === 'anonymous') {
                    req.loggedInUser = null;

                    return next();
                } if (token) {
                    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
                    const loggedInUser = await domain.User.findById(userId);

                    /* eslint max-len: 0 */
                    if (!canAccess(loggedInUser.role, accessLevel)) throw new Error(configHolder.messages.error.expireToken);

                    req.loggedInUser = loggedInUser;
                    return next();
                }
                throw new Error('Access denied');
            } catch (err) {
                return res.status(401).send({
                    success: false,
                    message: err,
                });
            }
        };
    }

    return {
        auth,
    };
})();
