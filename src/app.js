const express = require('express');
const cors = require('cors');
const {registerUser, signInUser, signOutUser} = require('./controllers/usersController');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());


app.post('/api/sign-up', registerUser);
app.post('/api/sign-in', signInUser);
app.post('/api/sign-out',authMiddleware, signOutUser);


app.listen(3000);