const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const goalsRoute = require('./routes/goalRoutes');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalsRoute);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
