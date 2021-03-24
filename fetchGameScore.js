import './utilities.js'
import * as constants from './constants.js'
export const fetchWord=(req, res) =>{
    const {userId}=req.body;
    requestUserScoreFromDatabase(userId).then((score)=>res.json(score));
}