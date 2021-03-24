import {validateIdPassword} from './utilities.js'
import jwt from 'jsonwebtoken'
import * as name from './constants.js'
export const login=(request,response)=>{
    const {emailId,password}=request.body;
    validateIdPassword(emailId,password).then((id)=>{
         if (id) {
            // Generate an access token
            const accessToken = jwt.sign({ id: id,  email: emailId }, name.accessTokenSecret);
    let responseData={}
    responseData.id=id;
    responseData.accessToken=accessToken;
            response.json(responseData);
        } else {
            response.send('Username or password is incorrect');
        }
    })
}