const express = require('express');
const cors = require('cors');
const {registerUser, signInUser, signOutUser} = require('./controllers/usersController');
const { getAllFinancies, postFinancie } = require('./controllers/financiesController');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

//USER routes
app.post('/api/sign-up', registerUser);
app.post('/api/sign-in', signInUser);
app.post('/api/sign-out',authMiddleware, signOutUser);

//Financial Route
app.get('/api/financies', authMiddleware, getAllFinancies );
app.post('/api/financies', authMiddleware, postFinancie );

module.exports = app;