const router = require('express').Router();
//with get-set-token route
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
//with get/restore-user route
const { restoreUser } = require('../../utils/auth.js');


router.use(restoreUser);

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
