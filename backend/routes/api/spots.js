const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
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
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
            ]
        },
        //giving access to these models thru the associations created
        include: [
            { model: Review, attributes: [] }
        ],
        //making sure to find All Spots
        group: ['Spot.id'],
        raw: true
    })
    // console.log(Spots) arr of obj

    //because spot is referencing Spots, I dont have to add it into Spots
    for (let spot of Spots) { //spot is checking every single spot in Spots table
        const img = await Image.findOne({
            attributes: ['url'],
            where: {
                previewImage: true,
                spotId: spot.id
            },
            raw: true
        })

        // console.log(img) returning an object : { url: 'www.home8.com' } || null depending on the value of previewImage
        if (img) {
            spot.previewImage = img.url
        } else {
            spot.previewImage = null
        }
    }

    res.json({ Spots })
})



// Get all Spots owned by Current User
router.get('/current', async (req, res, next) => {
    //find current user?
    const id = req.user.dataValues.id
    // const id = 4 (testing because the newly signed up user doesnt have data)

    //find all spots owned by user
    const currUser = await Spot.findAll({
        attributes: { include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]] },
        include: [{ model: Review, attributes: [] }],
        where: { id },
        raw: true
    })

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
        // img ? spot.previewImage = img.url : null
        if (img) {
            spot.previewImage = img.url
        } else {
            spot.previewImage = null
        }
    }



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
    const imagesInfo = await Image.findAll({
        //getting the attributes from images, aliasing spotId to imageableId
        attributes: ['id', ['spotId', 'imageableId'], 'url'],
        where: { spotId },
        raw: true
    })
    // console.log(imagesInfo) // return an object of images at the specified spotId
    spotInfo.Images = imagesInfo


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
    const spotId = req.params.spotId;

    const { url, previewImage } = req.body

    const dbImg = await Image.create(
        {
            url,
            previewImage,
            spotId
        }
    )

    //seeing if the spot Id exists (for the if statement)
    const findSpots = await Spot.findByPk(spotId)


    //finding all images once we create with function above
    const newImg = await Image.findAll({
        raw: true
    })
    console.log(newImg)
    // console.log(newImg[newImg.length-1])
    //get the last image (the image you just created)
    let lastImg = newImg[newImg.length - 1]

    //create an object to send the response
    const object = {}
    object.id = lastImg.id
    object.imageableId = spotId
    object.url = lastImg.url

    if (findSpots) {
        res.status(200)
        res.json(object)
    } else {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }


})


// edit a spot
router.put('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    let updatedSpot = await Spot.findByPk(spotId)


    if (spotId) {
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
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
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

    const tester = 3
    const currUser = user.dataValues.id;
    //return all reviews that belong to a spot
    const review = await Review.findAll({
        // include: { model: User, attributes: ['id', 'firstName', 'lastName'] },
        where: { spotId: tester }, raw: true
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
            where: { spotId: tester }, raw: true
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


router.post('/:spotId/reviews', restoreUser, async (req, res, next) => {
    const { user } = req
    let id = req.params.spotId


})


module.exports = router;
