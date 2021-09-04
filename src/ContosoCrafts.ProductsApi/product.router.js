/* eslint-disable import/extensions */

import express from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from './logger.js';
import Product from './product.schema.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.page, 10) : 10;

  try {
    const results = await Product.find({}).skip((page - 1) * limit).limit(limit);

    res.status(StatusCodes.OK).json(results);
  } catch (error) {
    logger.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});

productRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    logger.error('No id provided');
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Something went wrong' });
    return;
  }

  const product = await Product.findOne({ Id: id });

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
    const updatedDoc = await Product.findOneAndUpdate({ Id: productId }, { $push: { rating } }, { new: true });

    res.status(StatusCodes.OK).json(updatedDoc);
  } catch (error) {
    logger.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
});

export default productRouter;
