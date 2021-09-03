import express from 'express';
import logger from "./logger.js";
import productRouter from './product.router.js';
import mongoose from 'mongoose';

const app = express();
const app_port = process.env.APP_PORT || 3000

app.use(express.json())

app.use('/products', productRouter);

try {
    await mongoose.connect('mongodb://admin:admin@localhost:27017', 
        { dbName: 'contosocrafts', serverSelectionTimeoutMS: 5000 }
    );

    app.listen(app_port, (error) => {
        if (error) {
            logger.error(error, "oh oh.. something bad happened");
            throw new Error(error);
        }
        logger.info(`Listening on port ${app_port}`);
    });

} catch (error) {
    logger.error(error, "oh oh.. something bad happened");
}
