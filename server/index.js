import express from 'express';
import bodyParser from 'body-parser'; //for getting images for string in json
import mongoose from 'mongoose'; // for mongodb
import cors from 'cors'; // for security

import listingRoutes from './routes/listings.js'; // 

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/listings', listingRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.REACT_APP_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false); 