const uuid = require('node-uuid');

module.exports = (function () {
    const create = async (data) => {
        const user = await domain.User.findByEmail(data.email);

        if (user) throw new Error(configHolder.messages.error.email_not_unique);

        const salt = uuid.v1();
        const password = configHolder.encryptUtil.encryptPassword(data.password, salt);

        Object.assign(data, { salt, password });

        return domain.User.create(data);
    };

    const changePassword = async (req, res, callback) => {
        try {
            const { newPassword } = req.body;

            const user = req.loggedInUser;

            const success = await domain.User.updatePassword(user.id, newPassword);

            if (!success) throw new Error(configHolder.messages.error.internalServerError);

            return callback(null, {
                message: 'Password successfully changed.',
            });
        } catch (err) {
            return callback(err);
        }
    };

    const changeEmail = async (req, res, callback) => {
        try {
            const { newEmail } = req.body;

            const user = req.loggedInUser;

            // check email already exists or not
            const isEmailExists = await domain.User.findByEmail(newEmail);

            if (isEmailExists) throw new Error(configHolder.messages.error.email_not_unique);

            const success = await user.update({ email: newEmail });

            if (!success) throw new Error(configHolder.messages.error.internalServerError);
            else if (!success.ok) throw new Error(configHolder.messages.error.internalServerError);

            return callback(null, {
                message: 'Email successfully changed.',
            });
        } catch (err) {
            return callback(err);
        }
    };

    return {
        create,
        changePassword,
        changeEmail,
    };
}());
