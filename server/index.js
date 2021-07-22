import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import Home from './routes/routes.js';

// ENV
const dotenvResultado = dotenv.config();
if (dotenvResultado.error) {
  throw dotenvResultado.error;
}

// Express
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors());


// Mongoose
const CONNECTION_URL = `mongodb+srv://admincontrolemei:${process.env.SENHADB}@cluster0.ah6c5.mongodb.net/ControleMEI?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((res) => {
    console.log(res)
    app.listen(PORT, () => console.log('Server running on port', PORT));
  });

mongoose.set('useFindAndModify', false);


app.use('/', Home); 

