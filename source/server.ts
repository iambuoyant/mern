// import bodyParser from 'body-parser';
import express from 'express';
import Helmet from "helmet";
import logging from './config/logging';
import config from './config/config';
import routes from './routes';
import scheduler from './services/scheduler';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import cors from 'cors';
import dotenv from 'dotenv';

scheduler();
dotenv.config();

const NAMESPACE = 'Server';
const app = express();


const DB_URL:string = `${process.env.MONGO_STRING}`;
/** Connect to Mongo */
mongoose
    .connect(DB_URL, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Mongo Connected');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

// Application Middwarewares 
// Helmet For Security 
app.use(Helmet());
app.use(express.json({ limit: '900mb' }));
app.use(express.urlencoded({ extended: true }))

/* FOR CORS */
app.use(cors());    
    
/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});



app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
app.use('/api/v1/', routes);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});


app.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
