/* eslint-disable import/extensions */
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import lightshipMod from 'lightship';
import logger from './logger.js';

// eslint-disable-next-line no-unused-vars
const { createLightship, ConfigurationInput } = lightshipMod;

/** @type {ConfigurationInput} */
const lightshipConfig = {
  port: parseInt(process.env.LIGHTSHIP_PORT, 10) || 9000,
};

const lightship = createLightship(lightshipConfig);

const app = express();
const appPort = parseInt(process.env.NODE_APP_PORT, 10) || 80;

app.use(express.json({ type: ['application/json', 'application/*+json'] }));

app.get('/dapr/subscribe', (req, res) => {
  const payload = [
    {
      pubsubname: 'rabbitmqbus',
      topic: 'checkout',
      route: 'checkout',
      metadata: {
        rawPayload: 'true',
      },
    },
  ];

  res.status(StatusCodes.OK).json(payload);
});

app.post('/checkout', (req, res) => {
  logger.info(req.body);
  logger.info('Order received...');

  res.status(StatusCodes.ACCEPTED);
});

const server = app.listen(appPort, () => {
  lightship.signalReady();
  logger.info(`Node Environment ${process.env.NODE_ENV}`);
  logger.info(`Listening on port ${appPort}`);
});

server.on('error', (error) => {
  logger.error(error, 'oh oh.. something bad happened');
  lightship.shutdown();
});
