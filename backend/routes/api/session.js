const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();


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
        return res.json({
            user
        });
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
