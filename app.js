import 'dotenv/config';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import {createServer} from 'http';

const app = express();

const { PORT, } = process.env;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

