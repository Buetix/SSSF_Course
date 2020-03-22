'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const catRouter = require('./routes/catRoute');
const userRouter = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const multer = require('multer');
const authRoute = require('./routes/authRoute');
const passport = require('passport');
const jwt      = require('jsonwebtoken');

app.use(cors());
app.use('/public', express.static('week2_public_html'));

app.use('/cat', passport.authenticate('jwt', {session: false}),catRouter);
app.use('/users', passport.authenticate('jwt', {session: false}),userRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html'); 
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
