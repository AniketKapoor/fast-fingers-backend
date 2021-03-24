import * as constants from './constants.js'
import jwt from 'jsonwebtoken'
import mysql from 'mysql';
 let connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    database: 'pesto',
    user: 'root',
    password: ''
});
connection.connect((err) => {
    if (err)
        return err
})
export const validateIdPassword = (emailId, password) => {
    return new Promise((resolve, reject) => {
        connection.query(`select id as id from userdetails where email='${emailId}' and password='${password}'`, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result[0]);
        })
    })
}
export const storeInDataBase = (userName, email, password) => {
    connection.query(`insert into userDetails (userName,email,password) values ('${userName}','${email}','${password}');`, (error, result) => {
        if (error) {
            return error
        }
        return result;
    })
}
export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, constants.accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
export const checkForAlreadyExists = (email) => {
    return new Promise( (resolve, reject)=> {
        let returnValue = 0;
        connection.query(`select count(*) as total from userdetails where email='${email}'`, (error, result) => {
            if (error) {
                return reject(error);
            }
            returnValue = result[0].total;
            return resolve(returnValue);
        })
    })
}
export const requestWordFromDatabase=(difficulty)=>{
return new Promise((resolve,reject)=>{
    connection.query(`select word as word from fastfingers where difficulty='${difficulty}' ORDER BY RAND() LIMIT 1`),(error,result)=>{
        if(error)
        return reject(error);
        return resolve(result[0].word);
    } 
})
}
export const storeScoreInDatabase=()=>{
    return new promise((resolve,reject)=>{

    connection.query(`insert into gamesession (userId,gamescore,timestamp) values ('${userId}','${gamescore}','${Date.now()}');`, (error, result) => {
        if (error) 
            return reject(error);
            return resolve('success');
         })
    })
}
export const requestUserScoreFromDatabase = (userId) => {
    return new Promise( (resolve, reject)=> {
        let returnValue = {};
        connection.query(`select gamescore as gamescore from gamesession where userId='${userId}'`, (error, result) => {
            if (error) {
                return reject(error);
            }
            returnValue = result.gamescore;
            return resolve(returnValue);
        })
    })
}
export default {checkForAlreadyExists,storeInDataBase,validateIdPassword,authenticateJWT,requestWordFromDatabase};