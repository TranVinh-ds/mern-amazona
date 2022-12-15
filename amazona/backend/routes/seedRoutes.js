import express from 'express';
import Product from '../models/productModel.js';

import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (request, response) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  response.send({ createdProducts, createdUsers });
});

export default seedRouter;
