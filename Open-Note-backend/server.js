import express from 'express';
import connectMongoDB from './database/connectMongoDB.js';
import UserRoute from './routes/UserRoute.js'
import NoteRoute from './routes/NoteRoute.js'

const app = express();
const port = 4000
const hostname = 'localhost'

// Connect MongoDB
connectMongoDB();

// Middlewre
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Endpoints
app.use('/api/user', UserRoute)
app.use('/api/notes', NoteRoute)

// Sever start
app.listen(port, hostname, () => {
    console.log(`Server is listening at port: http://${hostname}:${port}`);
})