const express = require('express');
const config = require('config');
const { errorHandler } = require('./middleware/errorMiddleware');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

const goalsRoute = require('./routes/goalRoutes');
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

if (!config.get('jwtPrivateKey')) {
	console.log('FATAL ERROR: jwtPrivateKey is not defined.');
	process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalsRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
