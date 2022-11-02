const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Booking, Image, Review, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:imagesId', restoreUser, async (req, res, next) => {
    const imagesId = req.params.imagesId

    const { user } = req
    //authorization
    if (!user) return res.status(401).json({ "message": "Authentication required", "statusCode": 401 })

    //couldnt find an image 
    let findImage = await Image.findOne({ where: { id: imagesId } })
    if (!findImage) return res.status(404).json({ "message": "Image couldn't be found", "statusCode": 404 })

    let checkImage = findImage.toJSON()

    // image must belong to the current user
    if (checkImage.userId !== user.dataValues.id) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

    await findImage.destroy();
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })

})


module.exports = router;
