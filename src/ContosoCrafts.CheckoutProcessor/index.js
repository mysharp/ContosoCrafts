import express from 'express';
import { StatusCodes } from 'http-status-codes';
// eslint-disable-next-line import/extensions
import logger from './logger.js';

const app = express();
const appPort = process.env.APP_PORT || 3000;

app.use(express.json());

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

app.listen(appPort, (error) => {
  if (error) {
    logger.error(error, 'oh oh.. something bad happened');
    throw new Error(error);
  }
  logger.info(`Listening on port ${appPort}`);
});
