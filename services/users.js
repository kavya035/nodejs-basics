const { db } = require('./../database/config');
const dotEnv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY:jwtKey,JWT_EXPIRY_SECONDS:jwtExpirySeconds } = process.env;

const {checkAuthorization} = require('../utils/helper')

const signIn = async (payload) => {
    const { fname, password } = payload;
  
    try {
        
        // need to check in database wethere data is validate or  not
        const { rowCount } =await db.query(`SELECT * FROM USERS WHERE fname='${fname}' and password='${password}'`);
        // console.log(data);
        if( rowCount === 0 ) {
            return { errors: [ { name: 'Invalid Data', message: 'No Data found' } ] };
        }
        const token = jwt.sign({ fname }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        })
        console.log("token:", token)
    
        return { doc: { token, message: 'successfully Logined.' } };
    } catch (err) {
      console.log(err);
      return { errors: [ { name: 'transaction', message: 'transaction failed.' } ] };
    }
  };

const signUp = async (payload) => {
  try{
    const { fname,lname,password  } = payload;
    console.log(fname,lname,password);
    let { rowCount } = await db.query(
      `INSERT INTO users (fname,lname,password) values ($1,$2,$3) returning * `,[fname,lname,password]
    )
    console.log(rowCount);
    if(rowCount>0)
    {
      return {doc:{status:"sucesses", message: "Inserted Sucessfully"}}
    }
  }
  catch(err){
  return { errors: [ { name: 'transaction', message: 'transaction failed.' } ] };
  }
};

const getUsersList = async (payload,authorization) => {
    try{
      if (authorization) {
          const { errors } = await checkAuthorization(authorization);
          if (errors) {
            return { errors };
          }
          const { userId } = payload;
          let subCondition = '';
          if(userId){
          subCondition = `where id = ${userId}`
          }
          const data = await db.query(`SELECT * FROM users ${subCondition}`);
          console.log(JSON.stringify(data));
          return {doc:data.rows};
        
      }

      return { errors: [ { name: 'Authenticated error', message: 'Please enter authorization token' } ] };

      
    }
    catch(e){
      console.log(e);
      return {errors:`Internal server error`};
    }
};

  

  module.exports = {
    signIn,
    signUp,
    getUsersList
  }