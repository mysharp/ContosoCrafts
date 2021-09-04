import express from 'express';
import logger from "./logger.js";
import productRouter from './product.router.js';
import mongoose from 'mongoose';

const app = express();
const app_port = process.env.NODE_APP_PORT || 80
const mongodbHost = process.env.NODE_ENV == 'production' ? 'mongo_service:27017' : 'localhost:27017'

app.use(express.json())

app.use('/products', productRouter);

try {    
    await mongoose.connect(`mongodb://admin:admin@${mongodbHost}`,
        { dbName: 'contosocrafts', serverSelectionTimeoutMS: 5000 }
    );

    app.listen(app_port, (error) => {
        if (error) {
            logger.error(error, "oh oh.. something bad happened");
            throw new Error(error);
        }

        logger.info(`Node Environment ${process.env.NODE_ENV}`);
        logger.info(`Listening on port ${app_port}`);
    });

} catch (error) {
    logger.error(error, "oh oh.. something bad happened");
}
