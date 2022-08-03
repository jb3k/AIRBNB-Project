const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Image, Review, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//get all spots
router.get('/', async (req, res, next) => {
    const Spots = await Spot.findAll({
        attributes: {
            include: [
                //adding in a column of avgRating using a built in sequelize function in the column stars
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
                ],
                //adding the key pair of previewImage: with the value from colum url (in images table)
                [sequelize.literal('Images.url'), 'previewImage']
            ]
        },
        //giving access to these models thru the associations created
        include: [
            { model: Review, attributes: [] },
            { model: Image, attributes: [] }
        ],
        //making sure to find All Spots
        group: ['Spot.id']
    })


    res.json({ Spots })
})



// Get all Spots owned by Current User
router.get('/current', async (req, res, next) => {
    //find current user?
    const id = req.user.dataValues.id
    // const id = 4 (testing because the newly signed up user doesnt have data)

    //find all spots owned by user
    const currUser = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
                ],
                [sequelize.literal('Images.url'), 'previewImage']
            ]
        },
        include: [
            { model: Review, attributes: [] },
            { model: Image, attributes: [] }
        ],
        where: { id }
    })
    res.json(currUser)
})



//Get Details of a spot from an ID
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;
    //seeing if the spot Id exists (for the if statement)
    const findSpots = await Spot.findByPk(spotId)
    //number of reviews
    const reviews = await Review.count({
        where: { spotId }
    })

    const spotInfo = await Spot.findOne({
        attributes: {
            include: [
                //numReviews key value pair
                [sequelize.fn("COUNT", reviews), "numReviews"],
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
            ]
        },
        include: [
            { model: Review, attributes: [] },
            { model: Image, attributes: [] },
        ],
        raw: true, // makes the output of findOne,findAll,findByPk a JS object
        where: { id: spotId }
    })

    //query images
    const imagesInfo = await Image.findAll({ raw: true })
    for (let images of imagesInfo) {
        !images.reviewId ? images = images.spotId : images = images.reviewId
    }

    let img = {}
    // let imgData = imagesInfo.dataValues
    // img.id = imgData.id
    // //imageableid
    // img.imageableId = //value from the loop?
    // img.url = imgData.url


    //adding the "Owner property" into the spotInfo
    let owner = {}
    let userInfo = await User.findByPk(spotId)
    let data = userInfo.dataValues
    owner.id = data.id;
    owner.firstName = data.firstName;
    owner.lastName = data.lastName;
    //I can do this because of the raw:true which maked the result of query an object
    spotInfo.Owner = owner


    if (!findSpots) {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    res.json(spotInfo)
})

//create a post
router.post('/', async (req, res, next) => {
    //deconstructing the body that is given in the req
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    console.log(req.user.dataValues.id,)

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
router.post('/:spotId/images', async (req, res, next) => {
    const spotId: = req.params.spotId;

    const { url } = req.body

    // still dont really know what to put for imageableId????
    const newImg = await Image.create(
        {
            id: spotId
            imageableId: fjhwef,
            url
        }
    )

    if (!newImg) {
        res.status(404),
            res.json({
                "message": "Spot couldn't be found",
                "statusCode": 404
            })

    }


    res.status(200)
    res.json(newImg)


})


//edit a spot
router.put('/:spotId', async (req, res, next) => {
    const spotId: = req.params.spotId;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;



})



//delete a spot
router.delete('/:spotId', async (req, res, next) => {
    const spotId: = req.params.spotId;

})


module.exports = router;
