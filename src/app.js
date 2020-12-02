const express = require('express');
const cors = require('cors');
const {registerUser, signInUser} = require('./controllers/usersController');

const app = express();

app.use(cors());
app.use(express.json());


app.post('/api/sign-up', registerUser);
app.post('/api/sign-in', signInUser);


app.listen(3000);