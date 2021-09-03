/* eslint-disable import/extensions */

import express from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from './logger.js';
import Product from './product.schema.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const { page } = req.query;
  const { limit } = req.query;

  const results = await Product.find({}).skip((page - 1) * limit).limit(limit);

  res.status(StatusCodes.OK).json(results);
});

productRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (product) {
    logger.info(`Product ${id} found`);
    res.status(StatusCodes.OK).json(product);
  } else {
    logger.info(`Product ${id} not found`);
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Product not found' });
  }
});

productRouter.patch('/', async (req, res) => {
  try {
    const { productId, rating } = req.body;
    // eslint-disable-next-line max-len
    const updatedDoc = await Product.findOneAndUpdate({ productId }, { $push: { rating } }, { new: true });

    res.status(StatusCodes.OK).json(updatedDoc);
  } catch (error) {
    logger.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
});

export default productRouter;
