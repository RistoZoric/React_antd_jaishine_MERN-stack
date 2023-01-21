const express = require('express');
const CoutryCategory = require('./models/Coutrycategory');
const SubCagory = require('./models/Subcategory');
const connectDB = require('./config/db');
const app = express();
// Connect Database
connectDB();
var obj_countryCategory = [
  {
    title: 'In Germany',
    description: 'this is title'
  },
  {
    title: 'Poland',
    description: 'this is title'
  },
  {
    title: 'Netherlands',
    description: 'this is title'
  },
  {
    title: 'Denmark',
    description: 'this is title'
  },
  {
    title: 'Austria',
    description: 'this is title'
  },
  {
    title: 'Switzerland',
    description: 'this is title'
  }
];

var obj_subcategory = [
  {
    title: 'Food Electronics',
    description: 'this is title'
  },
  {
    title: 'Textile',
    description: 'this is title'
  },
  {
    title: 'Raw',
    description: 'this is title'
  },
  {
    title: 'Ingredients',
    description: 'this is title'
  },
  {
    title: 'Gift Items',
    description: 'this is title'
  },
  {
    title: 'Spirits V',
    description: 'this is title'
  }
];

obj_countryCategory.map(async (value, index) => {
  console.log(value, 'this is country category');
  await new CoutryCategory(value).save();
});
obj_subcategory.map(async (value, index) => {
  console.log(value, 'this is country sub');
  await new SubCagory(value).save();
});
