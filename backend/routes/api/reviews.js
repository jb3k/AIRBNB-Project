const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Booking, Image, Review, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//Get all reviews of the Current User
router.get('/current', restoreUser, async (req, res, next) => {
    const { user } = req
    let totalReviews = {}

    // const tester = 3
    const currUser = user.dataValues.id;
    // console.log(currUser)
    //find the reviews written by the user
    const review = await Review.findAll({
        // include: { model: User, attributes: ['id', 'firstName', 'lastName'] },
        where: { userId: currUser }, raw: true
    })
    //adding the user section into the reviews search
    for (let userId of review) {
        const user = await User.findOne({
            attributes: ['id', 'firstName', 'lastName'],
            where: { id: currUser },
            raw: true
        })
        user ? userId.User = user : null

    }
    //find the spot the user reviewed
    for (let spot of review) {
        const spotInfo = await Spot.findOne({
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
            where: { id: spot.spotId }, raw: true
        })
        spotInfo ? spot.Spot = spotInfo : null
    }
    console.log(review)
    //find images of that review
    for (let images of review) {
        console.log(images)
        const img = await Image.findOne({
            attributes: ['id', ['reviewId', 'imageableId'], 'url'],
            where: { reviewId: images.id }, raw: true
        })
        img ? images.Images = img : null
    }


    //problem I am having is getting the Spot and the Images in the in the Reviews array... if i add them separately into an object, the spot and the image arent in the arr
    totalReviews.Reviews = review
    res.json(totalReviews)
})


// create an image to a review based on the reviews id
router.post('/:reviewId/images', restoreUser, async (req, res, next) => {
    const id = req.params.reviewId;
    const { user } = req
    if (!user) return res.status(401).json({ "message": "You're not logged in", "statusCode": 401 })

    const { url, previewImage } = req.body;

    //finding the review
    const findReview = await Review.findByPk(id)
    if (!findReview) return res.status(404).json({ "message": "Review couldn't be found", "statusCode": 404 })

    //creating a new img in the db
    let newImg = await Image.create(
        {
            url,
            previewImage,
            userId: user.id,
            reviewId: id
        }
    )

    //create an obj for the response
    const obj = {}
    //create wanted responses in the obj
    obj.id = newImg.id;
    obj.imageableId = parseInt(newImg.reviewId)
    obj.url = newImg.url


    //add error handler that requires max of 10 images per review
    const imgNum = await Image.findAndCountAll({ where: { reviewId: id }, raw: true })
    console.log(imgNum)
    if (imgNum > 10) {
        res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }

    res.status(200).json(obj)

})


//edit a review, make sure the user is allowd to edit
router.put('/:reviewId', restoreUser, async (req, res, next) => {
    const id = req.params.reviewId;
    const { user } = req
    if (!user) return res.status(401).json({ "message": "You're not logged in", "statusCode": 401 })

    const { review, stars } = req.body;

    let updatedReview = await Review.findByPk(id)
    if (!updatedReview) return res.status(404).json({ "message": "Review couldn't be found", "statusCode": 404 })

    let reviewInfo = await Review.findOne({ where: { id }, raw: true })
    // console.log(updatedReview)


    if (id) {
        const newReview = await updatedReview.set(
            {
                userId: user.dataValues.id,
                spotId: reviewInfo.spotId,
                review,
                stars
            }
        )
        await newReview.save()
        res.json(newReview)

    }


})


router.delete('/:reviewId', restoreUser, async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const { user } = req
    if (!user) return res.status(401).json({ "message": "You're not logged in", "statusCode": 401 })

    let destroyReview = await Review.findByPk(reviewId);

    if (destroyReview) {
        await destroyReview.destroy();
        res.json({
            message: "Successfully deleted"
        })
    } else {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

})



module.exports = router;
