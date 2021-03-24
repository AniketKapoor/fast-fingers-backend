import './utilities.js'
import * as constants from './constants.js'
export const fetchWord=(req, res) =>{
    const {difficulty}=req.body;
    requestWordFromDatabase(difficulty).then((word)=>res.json(word));
}