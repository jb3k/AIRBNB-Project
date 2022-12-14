const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
//added spotsRouter
const spotRouter = require('./spots.js');
//added reviewsRouter
const reviewRouter = require('./reviews.js')
//added bookingRouter
const bookingRouter = require('./bookings.js')
//added images
const imageRouter = require('./images.js')

const { restoreUser } = require("../../utils/auth.js");


router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotRouter);
router.use('/reviews', reviewRouter);
router.use('/bookings', bookingRouter);
router.use('/images', imageRouter);


//test 1
//this is settng the token key to the cookies in browser
// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });

//test 2
// router.use(restoreUser);
//this is saving the token in the cookies when you are in a different route (/restore-user)
// router.get(
//     '/restore-user',
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

//test 3
// GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );




router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});


module.exports = router;
