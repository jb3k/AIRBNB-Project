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



//Get Details of a  spot from an ID
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;

    const findSpots = await Spot.findByPk(spotId)

    const userSpots = await Spot.findAll({
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
            { model: Image, attributes: ['id', 'previewImage', 'url'] },
            { model: User, attributes: ['id', 'firstName', 'lastName'] }
        ],
        where: { id: spotId }
    })

    if (!findSpots) {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    res.json(userSpots)

})






module.exports = router;
