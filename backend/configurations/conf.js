const dotenv = require('dotenv');

module.exports = () => {
    // add Roles in the system
    const roles = ['admin', 'superAdmin', 'guest'];

    // Add different accessLevels
    const accessLevels = {
        anonymous: ['admin', 'superAdmin', 'guest'],
        authenticated: ['admin', 'superAdmin'],
        admin: ['admin', 'superAdmin'],
        superadmin: ['superAdmin'],
    };

    dotenv.config({
        path: `${__dirname}/../env/${process.env.NODE_ENV}.env`,
    });

    return {
        roles,
        accessLevels,
    };
};
