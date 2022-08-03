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

    const userInfo = await Spot.findOne({
        attributes: {
            include: [
                //numReviews key value pair
                [sequelize.fn("COUNT", reviews), "numReviews"],
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
                ]
            ]
        },
        include: [
            { model: Review, attributes: [] },
            { model: Image, attributes: [] },
            //owner property should be created
            // { owner }
        ],
        raw: true, // makes the output of findOne,findAll,findByPk a JS object
        where: { id: spotId }
    })

    
    if (!findSpots) {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    res.json(userInfo)
})

//create a post
router.post('/', async (req, res, next) => {
    //deconstructing the body that is given in the req
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    //

})




module.exports = router;
