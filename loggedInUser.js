import './utilities.js'
import * as constants from './constants.js'
export const welcomeUser=(req, res) =>res.json(constants.welcomeMessage);