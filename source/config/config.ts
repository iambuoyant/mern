import dotenv from 'dotenv';

dotenv.config();

const AUTH = {
    ENCRYPTION_KEY: `${process.env.ENCRYPTION_KEY}`,
    ENCRYPTION_ALGORITHM: `${process.env.ENCRYPTION_ALGORITHM}`,
    SECRET_KEY: `${process.env.SECRET_KEY}`,
    STATIC_JWT: `${process.env.STATIC_JWT}`,
    UNAUTHORIZE_JWT: `${process.env.UNAUTHORIZE_JWT}`,
    ID: `${process.env.ID}`,
    API_KEY: `${process.env.API_KEY}`
};
const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false
};
const MONGO = {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: process.env.MONGO_STRING
};

const SERVER = {
    hostname: process.env.SERVER_HOSTNAME,
    port: process.env.PORT
};

const config = {
    mongo: MONGO,
    server: SERVER,
    auth: AUTH,
    dbtesturl: process.env.MONGO_ATLAS
};

export default config;
