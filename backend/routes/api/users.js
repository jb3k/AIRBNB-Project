const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//checks all of these params
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

//sign up
router.post(
    '/',
    //adding the validate sign up middleware
    validateSignup,
    //aynsc func
    async (req, res) => {
        const { firstName, lastName, email, password, username } = req.body;
        //signup method to sign up for site
        let user = await User.signup({ firstName, lastName, email, username, password });

        if (!user) {
            const err = new Error('User Already Exists');
            err.status = 403;
            err.errors = {
                "email": "User with that email already exists"
            }
            return next(err);
        }
        //once user successfully created, set token cookie 
        await setTokenCookie(res, user);

        //and return the user info
        return res.json(user);
    }
);


//get user
router.get('/current', async (req, res, next) => {
    const id = req.user.dataValues.id

    const currUser = await User.findByPk(id)


    res.json(currUser)
})

module.exports = router;
