import express from 'express';
import cors from 'cors';
import connectMongoDB from './database/connectMongoDB.js';
import UserRoute from './routes/UserRoute.js'
import NoteRoute from './routes/NoteRoute.js'
import config from '../config/config.js';

const app = express();
const hostname = config.hostname;
const port = config.port;

// Connect MongoDB
connectMongoDB();

// Middlewre
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoints
app.use('/api/user', UserRoute);
app.use('/api/notes', NoteRoute);

// Sever start
app.listen(port, hostname, () => {
    console.log(`Server is listening at port: http://${hostname}:${port}`);
})