const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
    //basically checks to see if credential is empty or not
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),

    //basically checks to see if password is empty or not
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];


//return session user as JSON under key of user
router.get(
    '/',
    //connect to restoreUser
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
            //if there is no session, it will return nothing
        } else return res.json({});
    }
);



//post
router.post(
    '/',
    //added validate login arr
    validateLogin,
    //aysnc route handler
    async (req, res, next) => {
        const { credential, password } = req.body;

        //calling the login static method
        const user = await User.login({ credential, password });

        //if user doesn't exist, throw this error below
        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        //if theres a user from login method, call setTokenCookie method
        await setTokenCookie(res, user);
        //and return res w/ user info
        return res.json(user);
    }
);

//this deletes the token in the cookie
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);



module.exports = router;
