const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY:jwtKey,JWT_EXPIRY_SECONDS:jwtExpirySeconds } = process.env;



const checkAuthorization = async (authorization) => {
    try{
        const parts = authorization.split(' ');
  
        const bearer = parts[0];
      
        const token = parts[1];
      
        if (bearer === 'Bearer') {
            if(token){
               const verifyStauts = jwt.verify(token, jwtKey);
               console.log(verifyStauts);
               return verifyStauts;
            }
        //   const user = getUser(token);
      
            return {
              errors: [ {
                name: 'Authentication',
                message: 'Invalid Token',
              } ],
            };
    
        }
      
        return {
          errors: [ {
            name: 'Authentication',
            message: 'Authentication must use Bearer',
          } ],
        };
    }
    catch(e){
        console.log(e);
        return {
            errors: [ {
                name: 'Authentication Failed',
                message: "Please enter valid token",
            } ],
          };
    }
   
  };


  module.exports = {
    checkAuthorization
  };