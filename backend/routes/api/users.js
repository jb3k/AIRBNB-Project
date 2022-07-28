const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


//sign up
router.post(
    '/',
    //aynsc func
    async (req, res) => {
        const { email, password, username } = req.body;
        //signup method to sign up for site
        const user = await User.signup({ email, username, password });

        //once user successfully created, set token cookie 
        await setTokenCookie(res, user);

        //and return the user info
        return res.json({
            user
        });
    }
);



module.exports = router;
