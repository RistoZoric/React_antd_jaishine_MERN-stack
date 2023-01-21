const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const pin=require('./pin/data.json')
router.get('/',auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/getUser', async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.post('/getUser', async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.find({ _id: id });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email,active:1 });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.post(
  '/resign',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, userType, email, password } = req.body;
    try {
      let user = await User.findOne({
        name: name,
        userType: userType,
        email: email
      });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const salt = await bcrypt.genSalt(10);
      const passwords = await bcrypt.hash(password, salt);
      user.password = passwords;
      await user.save();
      return res.json(user);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

router.get('/approve/:_id', auth, async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.params._id },
      [{ $set: { status: { $eq: [false, '$status'] } } }],
      { new: true }
    );
    user = await User.find();
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

//UPDATE
router.post(
  '/update',
  check('name', 'Name is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { _id } = req.body;
    const update_data=req.body
    delete update_data.__v
    delete update_data._id
    try {
      let user = await User.findOneAndUpdate(
        { _id: _id },
        [{ $set: update_data }],
        { new: true }
      );
      user = await User.find();
      return res.json(user);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

router.delete('/:_id', async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params._id });

    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});
router.post('/active', async (req, res) => {
  const { id, status } = req.body;
  try {
    let offer = await User.findOneAndUpdate(
      { _id: id },
      [{ $set: { active: status } }],
      { new: true }
    );
    var data=await User.find()
    res.status(200).json({ msg: 'Active is updated correctly',data:data});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
