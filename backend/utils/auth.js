const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;


//ste cookies after a user is logged in
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        //the payload will be the return value of .toSafeObject() (from the user model)
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie to an HTTP-onlycookiee on the response eas a token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

//restore session user based on the conteents of the JWT cookie
const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    // why are we setting this to null? is this before they login?
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            //if a user is found savee the user to a key of user onto the req.
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }
        //if user cant be cound with the id... clear cookies and set req.user to null
        if (!req.user) res.clearCookie('token');

        return next();
    });
};
//The restoreUser middleware will be connected to the API router 
//so that all API route handlers will check if there is a current user logged in or not.


//requiring session user to be authenticated
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
}



module.exports = { setTokenCookie, restoreUser, requireAuth };
