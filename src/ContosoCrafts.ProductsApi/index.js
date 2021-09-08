/* eslint-disable import/extensions */
import express from 'express';
import mongoose from 'mongoose';
import lightshipMod from 'lightship';
import logger from './logger.js';
import productRouter from './product.router.js';

// eslint-disable-next-line no-unused-vars
const { createLightship, ConfigurationInput } = lightshipMod;

const app = express();
const appPort = parseInt(process.env.NODE_APP_PORT, 10) || 80;
const mongodbHost = process.env.NODE_ENV === 'production' ? process.env.MONGO_SERVER : 'localhost:27017';

app.use(express.json({ type: ['application/json', 'application/*+json'] }));

app.use('/products', productRouter);

/** @type {ConfigurationInput} */
const lightshipConfig = {
  port: parseInt(process.env.LIGHTSHIP_PORT, 10) || 9000,
};

const lightship = createLightship(lightshipConfig);

lightship.queueBlockingTask((async () => {
  try {
    await mongoose.connect(`mongodb://admin:admin@${mongodbHost}`,
      { dbName: 'contosocrafts', serverSelectionTimeoutMS: 5000 });

    logger.info(`Connection to MongoDB host established ${mongodbHost}`);
  } catch (err) {
    logger.error(err);
  }
})());

const server = app.listen(appPort, () => {
  lightship.signalReady();
  logger.info(`Node Environment ${process.env.NODE_ENV}`);
  logger.info(`Listening on port ${appPort}`);
});

server.on('error', (error) => {
  logger.error(error, 'oh oh.. something bad happened');
  lightship.shutdown();
});
