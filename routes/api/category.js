const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const CoutryCategory = require('../../models/Coutrycategory');
const Offer = require('../../models/Offre');
const SubCagory = require('../../models/Subcategory');

router.post(
  '/getdata',
  // auth,
  async (req, res) => {
    let country_category = await CoutryCategory.find({});
    let sub_category = await SubCagory.find({});
    res.status(200).json({ country_category, sub_category });
  }
);

router.post('/createOffer', async (req, res) => {
  try {
    var offer = new Offer(req.body);
    await offer.save();
    res.status(200).json({ msg: 'Created successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.post('/update', async (req, res) => {
  try {
    const { id } = req.body;
    update_data = req.body;
    delete update_data.id;
    let offer = await Offer.findOneAndUpdate(
      { _id: id },
      [{ $set: update_data }],
      { new: true }
    );
    // var offer = new Offer(req.body);
    // await offer.save();
    res.status(200).json({ msg: 'Succesfully Updated!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.post('/getoffer', async (req, res) => {
  var { id } = req.body;
  try {
    var data = await Offer.find({ _id: id });
    res.status(200).json({ data: data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.post('/search', async (req, res) => {
  const { country, subcategory, current, dir, page, role } = req.body;
  const page_number = parseInt(page);
  var country1 = country;
  var subcategory1 = subcategory;

  try {
    if (role == 1) {
      if (subcategory1.length === 0) {
        var sub = await SubCagory.find();
        sub.map((item) => {
          subcategory1.push(item.title);
        });
      }
      if (country1.length === 0) {
        var coun = await CoutryCategory.find();
        coun.map((item) => {
          country1.push(item.title);
        });
      }
      var data = await Offer.find({
        country: { $in: country1 },
        sub_category: { $in: subcategory1 }
      }).sort({ track: 1 });
      var total = data.length;
      var result;
      if (page_number * (current - 1) > total) {
        result = await Offer.find({
          country: { $in: country1 },
          sub_category: { $in: subcategory1 }
        })
          .sort({ track: 1 })
          .skip(page_number * (current - 1))
          .limit(total);
      } else {
        result = await Offer.find({
          country: { $in: country1 },
          sub_category: { $in: subcategory1 }
        })
          .sort({ track: 1 })
          .skip(page_number * (current - 1))
          .limit(page_number);
      }
      res
        .status(200)
        .send({ total: total, current: current, data: result, sort: dir });
    } else if (role === 0) {
      if (subcategory1.length === 0) {
        var sub = await SubCagory.find();
        sub.map((item) => {
          subcategory1.push(item.title);
        });
      }
      if (country1.length === 0) {
        var coun = await CoutryCategory.find();
        coun.map((item) => {
          country1.push(item.title);
        });
      }
      var data = await Offer.find({
        active: 1,
        country: { $in: country1 },
        sub_category: { $in: subcategory1 }
      }).sort({ track: 1 });
      var total = data.length;
      var result;
      if (page_number * (current - 1) > total) {
        result = await Offer.find({
          active: 1,
          country: { $in: country1 },
          sub_category: { $in: subcategory1 }
        })
          .sort({ track: 1 })
          .skip(page_number * (current - 1))
          .limit(total);
      } else {
        result = await Offer.find({
          active: 1,
          country: { $in: country1 },
          sub_category: { $in: subcategory1 }
        })
          .sort({ track: 1 })
          .skip(page_number * (current - 1))
          .limit(page_number);
      }
      res
        .status(200)
        .send({ total: total, current: current, data: result, sort: dir });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/image_upload', async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.files.file;
    var date = new Date();
    file.mv(
      `${__dirname}/../../client/public/uploads/${date.getTime() + file.name}`,
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        }

        res.json({
          name: file.name,
          url: `/uploads/${date.getTime() + file.name}`
        });
      }
    );
  } catch (err) {}
});
router.post('/file_upload', async (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.files.file;
    var date = new Date();
    file.mv(
      `${__dirname}/../../client/public/uploads/${date.getTime() + file.name}`,
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        }

        res.json({
          name: file.name,
          url: `/uploads/${date.getTime() + file.name}`
        });
      }
    );
  } catch (err) {}
});

router.post('/active', async (req, res) => {
  const { id, e } = req.body;
  try {
    let offer = await Offer.findOneAndUpdate(
      { _id: id },
      [{ $set: { active: e } }],
      { new: true }
    );
    res.status(200).json({ msg: 'Active is updated correctly' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.post('/delete', async (req, res) => {
  const { id } = req.body;
  try {
    await Offer.deleteOne({ _id: id })
    res.status(200).json({ msg: 'Deleted successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
