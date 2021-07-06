import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

import dotenv from 'dotenv';

const app = express();

dotenv.config()

app.use(express.json());

app.use(express.urlencoded({

  extended: true
  
}));

app.use(cors());


app.use('/posts',postRoutes);

app.use('/user',userRoutes);


const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
