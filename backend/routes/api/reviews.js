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


// add an image to a review based on the reviews id
router.post('/:reviewId/images', restoreUser, async (req, res, next) => {
    const id = req.params.reviewId;
    const { user } = req
    const { url, previewImage } = req.body;

    //finding the review
    const findReview = await Review.findByPk(id)

    //creating a new img in the db
    let newImg = await Image.create(
        {
            url,
            previewImage,
            spotId: false,
            userId: user.dataValues.id,
            reviewId: id
        }
    )

    //create an obj for the response
    const obj = {}
    //query thru all the images
    const img = await Image.findAll({ raw: true })
    //get last image (which should be the image we just created)
    const lastImg = img[img.length - 1]
    //create wanted responses in the obj
    obj.id = lastImg.id;
    obj.imageableId = lastImg.reviewId
    obj.url = lastImg.url


    //find the spot that you want to edit the review about
    // const spotInfo = await Review.findOne({where: {spotId:}})

    if (!findReview) {
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    } else if (!url || !previewImage) {
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
            }
        })
    } else {
        res.status(200)
        res.json(obj)
    }


})


//edit a review, make sure the user is allowd to edit
router.put('/:reviewId', restoreUser, async (req, res, next) => {
    
    const id = req.params.reviewId;
    const { user } = req
    const { review, stars } = req.body;

    let updatedReview = await Review.findByPk(id)


    if (id) {
        const newReview = await updatedReview.set(
            {
                userId: user.dataValues.id,
                spotId: false,
                review,
                stars
            }
        )
        await newReview.save()
        res.json(newReview)
    } else if (!id) {
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    } else {
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
            }
        })
    }


})


router.delete('/reviewId', async (req, res, next) => {
    const reviewId = req.params.spotId;

    let destroyReview = await Review.findByPk(reviewId);

    if (destroyReview) {
        await destroyReview.destroy();
        res.json({
            message: "Successfully deleted"
        })
    } else {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

})



module.exports = router;
