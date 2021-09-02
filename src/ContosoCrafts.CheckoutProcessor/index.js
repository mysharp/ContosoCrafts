import express from 'express';
import logger from "./logger";

const app = express();
const app_port = 3000

app.use(express.json())

app.get('/dapr/subscribe', (req, res) => {
    const payload = [
        {
            pubsubname="rabbitmqbus", topic= "checkout",
            route = "checkout",
            metadata: {
                rawPayload: 'true',
            }
        }
    ];

    res.json(payload);
});

app.post('/checkout', (req, res) => {
    logger.info(req.body)
    logger.info("Order received...")
});

app.listen(app_port, (error) => {
    if (error) {
        logger.error(error, "oh oh.. something bad happened");
        throw new Error(error);
    }
    logger.info(`Listening on port ${app_port}`);
});