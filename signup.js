import {checkForAlreadyExists} from  './utilities.js'
import {storeInDataBase} from './utilities.js'
import * as constants from './constants.js'
export const signup=(request,responseData)=>{
    let response={};
    const { name, email, password } = request.body;
    if (email.match('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')) {
        let existenceCount = 0;
        checkForAlreadyExists(email.trim()).then((existenceCount) => {
            switch (existenceCount) {
                case 0:
                    {
                        storeInDataBase(name, email, password);
                        response.code = '200';
                        response.message = constants.success;
                        responseData.json(response);
                        break;
                    }
                default:
                    {
                        response.errorCode = "002";
                        response.errorMessage = constants.alreadyExists;
                        responseData.json(response);
                    }
            }
        },(err)=>err);
    }
    else {
        response.errorCode = "001";
        response.errorMessage = constants.emailFormatError;
        responseData.json(response);
    }
}
