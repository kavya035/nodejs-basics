const { db } = require('./../database/config');


const getUsers = async() =>{
    try{
        const data = await db.query(`SELECT * FROM users`);
        console.log(JSON.stringify(data));
        return {doc:data.rows};
    }
    catch(e){
        console.log(e);
        return {errors:`Internal server error`};
    }
    

}


module.exports = { 
    getUsers 
}