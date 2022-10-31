const express = require('express')

const { restoreUser } = require('../../utils/auth');
const { Spot, User, Booking, Image, Review, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//get all current user's bookings
router.get('/current', restoreUser, async (req, res, next) => {

    const userId = req.user.id

    let Bookings = await Booking.findAll({
        where: {
            userId: userId
        },

        raw: true,
    })

    let bookArr = []

    for (let booking of Bookings) {

        let Spotty = await Spot.findOne({
            where: { id: booking.spotId },
            raw: true,
            attributes: ["id", "ownerId", "address", "city", "state", "country", "name", "price"]
        })

        let prev = await Image.findOne({
            where: {
                spotId: booking.spotId,
                previewImage: true
            }


        })
        if (prev) {
            Spotty.previewImage = prev.url
        }
        if (!prev) { Spotty.previewImage = null }


        let realBooking = {
            id: booking.id,
            spotId: booking.spotId,
            Spot: Spotty,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt

        }
        
        bookArr.push(realBooking)
    }

    res.json({ Bookings: bookArr })


})



//edit a booking
router.put('/:bookingId', restoreUser, async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const { user } = req
    if (!user) return res.status(401).json({ "message": "You're not logged in", "statusCode": 401 })

    const { startDate, endDate } = req.body;

    //couldnt find a booking with a specified ID
    let currentBooking = await Booking.findOne({ where: { id: bookingId } })
    if (!currentBooking) return res.status(404).json({ "message": "Booking couldn't be found", "statusCode": 404 })

    let checkBooking = currentBooking.toJSON()
    //user owns the booking
    if (checkBooking.userId !== user.dataValues.id) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    //end date is not before the start date
    if (endDate < startDate) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": { "endDate": "endDate cannot be on or before startDate" }
        })
    }

    //doesnt conflict with any other booking
    const spotBookedDates = await Booking.findAll({ where: { spotId: checkBooking.spotId }, raw: true })
    for (let dates of spotBookedDates) {
        let start = dates.startDate
        let end = dates.endDate

        if (startDate >= start && startDate <= end || endDate <= end && endDate >= start || startDate <= end && endDate >= start) {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }
    }

    // cant modify past booking
    if (checkBooking.startDate <= new Date()) {
        return res.status(403).json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }


    const newBooking = await currentBooking.set(
        {
            id: user.dataValues.id,
            spotId: currentBooking.spotId,
            startDate,
            endDate
        }
    )
    await newBooking.save()
    res.json(newBooking)


})

//delete a booking
router.delete('/:bookingId', restoreUser, async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const { user } = req
    //authorization
    if (!user) return res.status(401).json({ "message": "Authentication required", "statusCode": 401 })

    //couldnt find a booking with a specified ID
    let currentBooking = await Booking.findOne({ where: { id: bookingId } })
    if (!currentBooking) return res.status(404).json({ "message": "Booking couldn't be found", "statusCode": 404 })
    let checkBooking = currentBooking.toJSON()


    let spot = await Spot.findOne({ where: { id: checkBooking.spotId }, raw: true })
    let spotOwner = spot.ownerId
    // check if the user is the owner of the spot or the owner of the booking
    if (checkBooking.userId !== user.dataValues.id && spotOwner !== user.dataValues.id) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    //bookings that have been started cant be deleted
    if (checkBooking.startDate <= new Date()) {
        return res.status(403).json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })
    }


    await currentBooking.destroy();
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })


})


module.exports = router;
