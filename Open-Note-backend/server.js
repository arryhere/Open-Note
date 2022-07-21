import connectMongoDB from './db.js';
import express from 'express';
const app = express();
const port = 4000
const hostname = 'localhost'

connectMongoDB();

app.listen(port, hostname, () => {
  console.log(`Server is listening at port: http://${hostname}:${port}`);
})