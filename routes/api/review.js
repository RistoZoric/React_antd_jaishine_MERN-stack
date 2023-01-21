const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

router.post(
    '/',
    auth,
    async (req, res) => {
        const { walkerName, ownerName, communication, professionalism, workAgain, reviewDet } = req.body;
        try {
            const rating = (parseInt(communication)+parseInt(professionalism)+parseInt(workAgain))/3;
            const user = await User.findOneAndUpdate(
                { name: walkerName },
                {
                    $push: {
                        review: {
                            rating: rating,
                            ownerName: ownerName,
                            comment: reviewDet,
                            timeStamp: Date.now(),
                        }
                    }
                },
                { new: true }
            );
            return res.json(user);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
module.exports = router;
