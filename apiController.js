import {signup} from './signup.js'
import {login} from './login.js'
import {welcomeUser} from './loggedInUser.js'
import {fetchWord} from './fetchWord.js'
import {storeGameScore} from './storeGameScore.js'
import {fetchGameScore} from './fetchGameScore.js'
import './utilities.js'
import express from 'express';
import {authenticateJWT} from './utilities.js'
import bodyParser from 'body-parser';
//export const bodyParser = require('body-parser')
export const application = express();
//export const jwt=require('jsonwebtoken')
application.listen(3000, () => {
});
application.use(bodyParser.json());
application.post('/signup',signup);
application.post('/login',login);
application.get('/loggedInUser', authenticateJWT,welcomeUser);
application.post('/fetchWord', authenticateJWT,fetchWord);
application.post('/storeGameScore', authenticateJWT,storeGameScore);
application.post('/fetchGameScore', authenticateJWT,fetchGameScore);