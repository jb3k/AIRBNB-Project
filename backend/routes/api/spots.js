const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Booking, Image, Review, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//get all spots
router.get('/', async (req, res, next) => {

    let { page, size } = req.query

    page = parseInt(page);
    size = parseInt(size);

    if (Number.isNaN(page) || page < 1) page = 1;
    if (Number.isNaN(size) || size < 1) size = 20;

    const Spots = await Spot.findAll({
        // attributes: {
        //     include: [
        //         //adding in a column of avgRating using a built in sequelize function in the column stars
        //         [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
        //     ]
        // },
        // //giving access to these models thru the associations created
        // include: [
        //     { model: Review, attributes: [] }
        // ],
        // //making sure to find All Spots
        // group: ['Spot.id'],
        raw: true,

        //setting the limit to the size and setting offset to size
        limit: size,
        offset: size * (page - 1)
    })
    // console.log(Spots) returns an arr of obj

    //because spot is referencing Spots, I dont have to add it into Spots
    for (let spot of Spots) { //spot is checking every single spot in Spots table
        const averageStars = await Review.findOne({
            where: { spotId: spot.id },
            attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
            raw: true
        })
        // console.log(typeof averageStars, averageStars)
        averageStars ? spot.avgRating = averageStars.avgRating : spot.avgRating = null

        const img = await Image.findOne({
            attributes: ['url'],
            where: {
                previewImage: true,
                spotId: spot.id
            },
            raw: true
        })

        // console.log(img) returning an object : { url: 'www.home8.com' } || null depending on the value of previewImage
        img ? spot.previewImage = img.url : spot.previewImage = null
    }

    res.json({ Spots })
})



// Get all Spots owned by Current User
router.get('/current', async (req, res, next) => {
    //find current user
    const id = req.user.dataValues.id
    // const id = 4 (testing because the newly signed up user doesnt have data)

    //find all spots owned by user
    const currUser = await Spot.findAll({
        attributes: { include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]] },
        include: [{ model: Review, attributes: [] }],
        group: ['Spot.id'],
        where: { ownerId: id },
        raw: true
    })
    // console.log(currUser)

    for (let spot of currUser) { //spot is checking every single spot in Spots table
        const img = await Image.findOne({
            attributes: ['url'],
            where: {
                previewImage: true,
                spotId: spot.id
            },
            raw: true
        })
        // console.log(img) returning an object : { url: 'www.home8.com' } || null depending on the value of previewImage
        img ? spot.previewImage = img.url : null
    }



    res.json(currUser)
})



//Get Details of a spot from an ID
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;

    //number of reviews
    const reviews = await Review.count({
        where: { spotId }
    })

    const spotInfo = await Spot.findOne({
        attributes: {
            include: [
                //numReviews key value pair
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
            ]
        },
        include: [
            { model: Review, attributes: [] },
        ],
        raw: true, // makes the output of findOne,findAll,findByPk a JS object
        where: { id: spotId },
        group: ['Spot.id']
    })
    if (!spotInfo) return res.status(404).json({ "message": "Spot couldn't be found", "statusCode": 404 })


    //query images
    const imagesInfo = await Image.findAll({
        //getting the attributes from images, aliasing spotId to imageableId
        attributes: ['id', ['spotId', 'imageableId'], 'url'],
        where: { spotId },
        raw: true
    })
    // console.log(imagesInfo) // return an object of images at the specified spotId
    spotInfo.NumReviews = reviews
    spotInfo.Images = imagesInfo
    console.log(spotInfo)

    let owner = await User.findOne({
        where: { id: spotInfo.ownerId },
        attributes: ['id', 'firstName', 'lastName'],
        raw: true
    })
    //I can do this because of the raw:true which maked the result of query an object
    spotInfo.Owner = owner
    res.json(spotInfo)
})

//create a post
router.post('/', async (req, res, next) => {
    //deconstructing the body that is given in the req
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newSpot = await Spot.create(
        {
            ownerId: req.user.dataValues.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }
    )

    if (!newSpot) {
        res.status(400)
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        })
    }

    res.status(201);
    res.json(newSpot)

})



//create an image
router.post('/:spotId/images', restoreUser, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { user } = req
    if (!user) return res.status(401).json({ "message": "You're not logged in", "statusCode": 401 })

    const { url, previewImage } = req.body

    //seeing if the spot Id exists
    const findSpots = await Spot.findByPk(spotId)
    if (!findSpots) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const dbImg = await Image.create(
        {
            url,
            previewImage,
            spotId,
            userId: user.id
        }
    )

    //create an object to send the response
    const object = {}
    object.id = dbImg.id
    object.imageableId = parseInt(spotId)
    object.url = dbImg.url

    res.status(200).json(object)


})


// edit a spot
router.put('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    let updatedSpot = await Spot.findByPk(spotId)
    if (!updatedSpot) return res.status(404).json({ "message": "Spot couldn't be found", "statusCode": 404 })

    if (updatedSpot) {
        const newSpot = await updatedSpot.set(
            {
                ownerId: req.user.dataValues.id,
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            }
        )
        await newSpot.save()
        res.json(newSpot)
    } else {
        res.status(400).json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        })
    }

})



// //delete a spot
router.delete('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;

    let destroySpot = await Spot.findByPk(spotId);

    if (destroySpot) {
        await destroySpot.destroy();
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





//get all reviews by a spot's id
router.get('/:spotId/reviews', restoreUser, async (req, res, next) => {
    const { user } = req
    let id = req.params.spotId

    const findSpot = await Spot.findByPk(id)

    // const tester = 3
    const currUser = user.dataValues.id;
    //return all reviews that belong to a spot
    const review = await Review.findAll({
        // include: { model: User, attributes: ['id', 'firstName', 'lastName'] },
        where: { spotId: id }, raw: true
    })
    // adding the user section into the reviews search
    for (let userId of review) {
        const user = await User.findOne({
            attributes: ['id', 'firstName', 'lastName'],
            where: { id: currUser },
            raw: true
        })
        user ? userId.User = user : null
    }
    //what are the images referring to? 
    for (let images of review) {
        const img = await Image.findOne({
            attributes: ['id', ['reviewId', 'imageableId'], 'url'],
            where: { spotId: currUser }, raw: true
        })
        img ? images.Images = [img] : null
    }

    let obj = {}
    obj.Reviews = review

    if (findSpot) {
        res.status(200)
        res.json(obj)
    } else {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

})

//create a review for a spot based on the Spot's id
router.post('/:spotId/reviews', restoreUser, async (req, res, next) => {

    const { user } = req
    const currUser = user.dataValues.id

    if (!user) return res.status(401).json({ "message": "You're not logged in", "statusCode": 401 })

    //spots error
    let spotId = req.params.spotId
    const findSpots = await Spot.findByPk(spotId)
    if (!findSpots) return res.status(404).json({ "message": "Spot couldn't be found", "statusCode": 404 })

    // if the current user already has a review at this spot... user overlap error
    const findReviews = await Review.findOne({ where: { spotId, userId: currUser }, raw: true })
    console.log(findReviews)
    if (findReviews) return res.status(403).json({ "message": "User already has a review for this spot", "statusCode": 403 })


    let id = parseInt(spotId)
    const { review, stars } = req.body

    //creating the new review in the review db
    let newReview = await Review.create(
        {
            userId: user.dataValues.id,
            spotId: id,
            review,
            stars
        }
    )




    res.status(201)
    res.json(newReview)

})

//get booking for a spot based on the Spot's Id
router.get('/:spotId/bookings', restoreUser, async (req, res, next) => {
    const spotId = req.params.spotId
    const findSpot = await Spot.findByPk(spotId)
    if (!findSpot) return res.status(404).json({ "message": "Spot couldn't be found", "statusCode": 404 })

    const { user } = req;
    if (!user) return res.status(401).json({ "message": "You're not logged in", "statusCode": 401 })
    //find the owner of the spot
    const currOwner = await Spot.findAll({ attributes: ['ownerId'], where: { id: spotId }, raw: true })
    // console.log(currOwner[0].ownerId)

    const currentUser = user.dataValues.id

    //if logged in user does not own the spot
    if (currOwner[0].ownerId !== currentUser) {
        const obj = {}
        const nonOwnerBooking = await Booking.findAll({
            attributes: ['spotId', 'startDate', 'endDate'],
            where: { spotId },
            raw: true
        })
        obj.Bookings = nonOwnerBooking
        return res.status(200).json(obj)
    }
    //if the logged in user is owner of the spot
    else if (currOwner[0].ownerId === currentUser) {
        //lazyLoading
        // const userBooking = await Booking.findAll({ where: { spotId }, raw: true })
        // for (let user of userBooking) {
        //     console.log(user)
        //     const currUser = await User.findOne({ where: { id: user.userId }, raw: true })

        //     currUser ? user.User = currUser : null
        // }

        //eageLoading
        const userBooked = await Booking.findAll({ include: { model: User, where: { id: user.dataValues.id }, attributes: ['id', 'firstName', 'lastName'] } })
        const obj = {}
        obj.Bookings = userBooked
        return res.status(200).json(obj)
        // return res.status(200).json(userBooking)
    }

})

//create a booking from a spot based on the Spot's id
router.post('/:spotId/bookings', restoreUser, async (req, res, next) => {
    const spotId = req.params.spotId
    const findSpot = await Spot.findByPk(spotId)
    if (!findSpot) return res.status(404).json({ "message": "Booking couldn't be found", "statusCode": 404 })

    const { user } = req;
    if (!user) return res.status(401).json({ "message": "You're not logged in", "statusCode": 401 })


    const { startDate, endDate } = req.body
    //check if the startDate overlaps with any other date
    const spotBookedDates = await Booking.findAll({ where: { spotId }, raw: true })
    console.log(spotBookedDates)

    if (endDate < startDate) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    }

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

    //create the booking at the current spot I am atc  
    const newBooking = await Booking.create(
        {
            spotId,
            userId: user.dataValues.id,
            startDate,
            endDate
        }
    )
    res.status(201).json(newBooking)


})



module.exports = router;
