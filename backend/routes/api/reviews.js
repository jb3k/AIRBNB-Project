const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Booking, Image, Review, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//Get all reviews of the Current User
router.get('/current', restoreUser, async (req, res, next) => {
    let { user } = req
    let totalReviews = {}

    const tester = 3
    const currUser = user.dataValues.id;
    //find the reviews written by the user
    const review = await Review.findAll({
        // include: { model: User, attributes: ['id', 'firstName', 'lastName'] },
        where: { userId: tester }, raw: true
    })
    //adding the user section into the reviews search
    for (let userId of review) {
        const user = await User.findOne({
            attributes: ['id', 'firstName', 'lastName'],
            where: { id: tester },
            raw: true
        })
        user ? userId.User = user : null
    }
    //find the spot the user reviewed
    for (let spot of review) {
        const spotInfo = await Spot.findAll({
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
            where: { ownerId: tester }, raw: true
        })
        spotInfo ? spot.Spot = spotInfo : null

    }

    //find images of that review
    for (let images of review) {
        const img = await Image.findAll({
            attributes: ['id', ['reviewId', 'imageableId'], 'url'],
            where: { userId: tester }, raw: true
        })
        img ? images.Images = img : null
    }


    //problem I am having is getting the Spot and the Images in the in the Reviews array... if i add them separately into an object, the spot and the image arent in the arr
    totalReviews.Reviews = review
    res.json(totalReviews)
})







module.exports = router;
