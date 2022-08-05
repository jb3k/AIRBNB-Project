const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Booking, Image, Review, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//get all current user's bookings
router.get('/current', restoreUser, async (req, res, next) => {
    const { user } = req
    if (!user) return res.status(401).json({ "message": "You're not logged in", "statusCode": 401 })
    //lazyloading
    const tester = 3
    const currUser = user.dataValues.id
    const Bookings = await Booking.findAll({
        where: { id: currUser }, raw: true
    })
    for (let image of Bookings) {
        console.log(image)
        const img = await Image.findOne({
            attributes: ['url'],
            where: {
                previewImage: true,
                spotId: image.id
            },
            raw: true
        })
        img ? image.previewImage = img.url : null
    }
    for (let spot of Bookings) {
        console.log(spot)
        const spotInfo = await Spot.findOne({
            where: { id: spot.spotId }, raw: true
        })
        spotInfo ? spot.Spot = spotInfo : null
    }


    // const previewImg = await Spot.findAll({ raw: true })
    // for (let image of previewImg) {
    //     console.log(image)
    //     const img = await Image.findOne({
    //         attributes: ['url'],
    //         where: {
    //             previewImage: true,
    //             spotId: image.id
    //         },
    //         raw: true
    //     })
    //     img ? image.previewImage = img.url : null
    // }

    // const obj = {}
    // obj.Bookings = Bookings
    // for (let img of obj.Bookings) {
    // const spotPreviewImage = await Spot.findAll({ raw: true })
    // for (let image of spotPreviewImage) {
    //     console.log(image)
    //     const img = await Image.findOne({
    //         attributes: ['url'],
    //         where: {
    //             previewImage: true,
    //             spotId: image.id
    //         },
    //         raw: true
    //     })
    //     img ? Bookings.Spot.previewImage = img.url : null
    // }
    // img.Spot.previewImage = previewImg.previewImage
    // console.log(img.Spot)


    res.json({ Bookings })
})



//edit a booking
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

//delete a booking
router.delete('/:bookingId', restoreUser, async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const { user } = req
    const findUser = await Booking.findOne({ where: { userId: user.dataValues.id, id: bookingId } })
    if (!findUser) return res.status(401).json({ "message": "Authentication required", "statusCode": 401 })

    const findBooking = await Spot.findByPk(bookingId)
    if (!findBooking) return res.status(404).json({ "message": "Spot couldn't be found", "statusCode": 404 })

    let destroyBooking = await Review.findByPk(bookingId);

    if (destroyBooking) {
        await destroyBooking.destroy();
        res.json({
            message: "Successfully deleted"
        })
    } else {
        res.status(404);
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

})


module.exports = router;
