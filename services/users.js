const jsonwebtoken = require('jsonwebtoken');
const { db } = require('./../database/config');
const dotEnv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY:jwtKey,JWT_EXPIRY_SECONDS:jwtExpirySeconds } = process.env;

const signIn = async (payload) => {
    const { username, password } = payload;
  
    try {
        
        // need to check in database wethere data is validate or  not
        const data =await db.query(`SELECT * FROM USERS WHERE fname='${username}' and password='${password}'`);
        // console.log(data);
        if( data.rowCount === 0 ) {
            return { errors: [ { name: 'Invalid Data', message: 'No Data found' } ] };
        }

        const token = jwt.sign({ username }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        })
        console.log("token:", token)
    
        return { doc: { token, message: 'successfully stored.' } };
    } catch (err) {
      console.log(err);
      return { errors: [ { name: 'transaction', message: 'transaction failed.' } ] };
    }
  };

  module.exports = {
    signIn
  }