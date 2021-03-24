import './utilities.js'
export const storeGameScore=(req, res) =>{
    
    storeScoreInDatabase(req.body).then((status)=>res.json(status));
}