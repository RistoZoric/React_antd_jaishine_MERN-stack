const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Cities = require('../../models/Cities');
const pin=require('./pin/data.json')
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var role=null
    if(req.body.pin===pin.admin){
      role=1
    }else if(req.body.pin===pin.client){
      role=0
    }else{
     return  res.status(400).json({errors: [{ msg: 'You can not register!' }]})
    }
    var data={
      _id:"",
      address: '',
      city: '',
      company_name: '',
      country_name: '',
      date: '',
      email: '',
      mobile: '',
      name: '',
      position: '',
      postcode: '',
      region: '',
      telephone: '',
      ve: '',
      role
    }
    const { name, email, password,telephone,country_name } = req.body;
    req.body={...data,...req.body}
    var save_data=req.body
    delete save_data._id

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      user = await User.findOne({ name });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User(
        save_data
      );
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();
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

module.exports = router;
