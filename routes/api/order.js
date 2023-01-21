const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const nodemailer = require('nodemailer');

const User = require('../../models/User');

const refuseEmail = (dogName, from, to, walkerName) => "Your order for dog-" + dogName + " from " + from + "to " + to + " was refused by dog-walker: " + walkerName + "."
const acceptEmail = (dogName, from, to, walkerName) => "Your order for dog-" + dogName + " from " + from + "to " + to + " was accepted by dog-walker: " + walkerName + ".You can pay now via websites"


router.post(
    '/create',
    auth,
    async (req, res) => {
        const { formData, reqData } = req.body;
        try {
            let walker = await User.findOne({ name: reqData.walkerName });
            let owner = await User.findOne({ _id: req.user.id });
            const timestamp = Date.now();
            const walkers = await User.findOneAndUpdate(
                { name: reqData.walkerName },
                {
                    $push: {
                        request: {
                            ownerName: owner.name,
                            walkerName: walker.name,
                            dogName: formData.dogName,
                            deadline: {
                                from: formData.from,
                                to: formData.to,
                            },
                            budget: formData.budget,
                            proposal: formData.proposal,
                            timestamp: timestamp,
                        }
                    }
                },
                { new: true }
            );
            const owners = await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $push: {
                        request: {
                            ownerName: owner.name,
                            walkerName: walker.name,
                            dogName: formData.dogName,
                            deadline: {
                                from: formData.from,
                                to: formData.to,
                            },
                            budget: formData.budget,
                            proposal: formData.proposal,
                            timestamp: timestamp
                        }
                    }
                },
                { new: true }
            )

            return res.json(owners);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
router.post(
    '/update',
    auth,
    async (req, res) => {
        const { formData, reqData } = req.body;
        try {
            let walker = await User.findOne({ name: reqData.walkerName });
            let owner = await User.findOne({ _id: req.user.id });
            const walkers = await User.findOneAndUpdate(
                { name: reqData.walkerName, "request.timestamp": reqData.timestamp },
                {
                    $set: {
                        "request.$": {
                            ownerName: owner.name,
                            walkerName: walker.name,
                            dogName: formData.dogName,
                            deadline: {
                                from: formData.from,
                                to: formData.to,
                            },
                            budget: formData.budget,
                            proposal: formData.proposal
                        }
                    }
                },
                { new: true }
            );
            const owners = await User.findOneAndUpdate(
                { _id: req.user.id, "request.timestamp": reqData.timestamp },
                {
                    $set: {
                        "request.$": {
                            ownerName: owner.name,
                            walkerName: walker.name,
                            dogName: formData.dogName,
                            deadline: {
                                from: formData.from,
                                to: formData.to,
                            },
                            budget: formData.budget,
                            proposal: formData.proposal,
                        }
                    }
                },
                { new: true }
            )

            return res.json(owners);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
router.post(
    '/cancel',
    auth,
    async (req, res) => {
        const { reqId, walkerName } = req.body;
        try {
            const owner = await User.findOneAndUpdate(
                { _id: req.user.id, "request.timestamp": reqId },
                { $set: { "request.$.status": "Canceled" } },
                { new: true })
            const walker = await User.findOneAndUpdate(
                { name: walkerName, "request.timestamp": reqId },
                { $set: { "request.$.status": "Canceled" } },
                { new: true })
            return res.json(owner);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
router.post(
    '/pay',
    auth,
    async (req, res) => {
        const { walkerName, ownerName, timestamp, dogName, budget } = req.body;
        try {
            let pay;
            const owner = await User.findOne({ name: ownerName });
            if (parseInt(owner.pay) > parseInt(budget)) {
                pay = parseInt(owner.pay) - parseInt(budget);
                owner.pay = pay;
                let request = owner.request.find((item) => (item.timestamp === timestamp))
                request.status = "Done"
                await owner.save();
                const walker = await User.findOne({ name: walkerName });
                request = walker.request.find((item) => (item.timestamp === timestamp))
                request.status = 'Done'
                pay = parseInt(walker.pay) + parseInt(budget);
                walker.pay = pay;
                await walker.save();
                return res.json(owner);
            }
            else return res
                .status(400)
                .json({ errors: [{ msg: 'Insufficient funds' }] });
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
router.post(
    '/accept',
    auth,
    async (req, res) => {
        const { walkerName, ownerName, timestamp, dogName } = req.body;
        try {
            const walker = await User.findOneAndUpdate(
                { _id: req.user.id, "request.timestamp": timestamp },
                { $set: { "request.$.status": "Accepted" } },
                { new: true })
            const owner = await User.findOneAndUpdate(
                { name: ownerName, "request.timestamp": timestamp },
                { $set: { "request.$.status": "Accepted" } },
                { new: true })
            let request = walker.request.find((item) => (item.timestamp === timestamp))
            const from = walker.email;
            const to = owner.email;
            const subject = `Welcome ${ownerName}!.`
            const body = acceptEmail(dogName, request.deadline.from, request.deadline.to, walkerName);
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: 'dog.walker.mailer@gmail.com',
                    pass: '!a123456b!'
                }
            });

            const mailOptions = {
                from: from,
                to: to,
                subject: subject,
                text: body,
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log(err)
                else
                    console.log(info);
            });

            return res.json(walker);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
router.post(
    '/refuse',
    auth,
    async (req, res) => {
        const { walkerName, ownerName, timestamp, dogName } = req.body;
        try {
            const walker = await User.findOneAndUpdate(
                { _id: req.user.id, "request.timestamp": timestamp },
                { $set: { "request.$.status": "Refused" } },
                { new: true })
            const owner = await User.findOneAndUpdate(
                { name: ownerName, "request.timestamp": timestamp },
                { $set: { "request.$.status": "Refused" } },
                { new: true })
            let request = walker.request.find((item) => (item.timestamp === timestamp))
            const from = walker.email;
            const to = owner.email;
            const subject = `Welcome ${ownerName}!.`
            const body = refuseEmail(dogName, request.deadline.from, request.deadline.to, walkerName);
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: 'dog.walker.mailer@gmail.com',
                    pass: '!a123456b!'
                }
            });
            const mailOptions = {
                from: from,
                to: to,
                subject: subject,
                text: body,
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log(err)
                else
                    console.log(info);
            });

            return res.json(walker);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);
module.exports = router;
