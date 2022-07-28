
const fs = require('fs');
const path = require('path');
const { Users } = require('../services');


  const userData = {
    "user1" : {
      "name" : "mahesh",
      "password" : "password1",
      "profession" : "teacher",
      "id": 1
    },
    
    "user2" : {
      "name" : "suresh",
      "password" : "password2",
      "profession" : "librarian",
      "id": 2
    },
    
    "user3" : {
      "name" : "ramesh",
      "password" : "password3",
      "profession" : "clerk",
      "id": 3
    }
  }


  // Curd operation without connecting DB
  const users = async (req,res) => {
    res.send(userData)
  }

  const getFileUserInfo = async (req,res) => {
    // console.log(path.join(__dirname, '../users.json'));
    // return true;

    fs.readFile( path.join(__dirname, '../users.json'), 'utf8', function (err, data) {
      console.log( data );
      res.send(data );
   });
  }


  // app.get('/:id', function (req, res) {
  const getUserById = async(req,res) => {
    const {params:{id}} = req;
    // First read existing users.
    fs.readFile( path.join(__dirname, '../users.json'), 'utf8', function (err, data) {
       const users = JSON.parse( data );
       const user = users["user" + id] 
       res.end( JSON.stringify(user));
    });
 }

 const addUser = async(req,res) => {
  const { body:{name,password,profession,id},header:{authorization}} = req;
  fs.readFile( __dirname + "/" + "../users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    data['user4'] ={ "name": name, "password":password, "profession":profession, "id": id };
    res.end( JSON.stringify(data));
 });
}

const deleteUser = async(req,res) => {
  const {body:{id}} = req;
  fs.readFile( __dirname + "/" + "../users.json", 'utf8', function (err, data) {
    data = JSON.parse(data );
    delete(data[`user${id}`]);
    res.end( JSON.stringify(data));
 });
}

//File uploading
const uploadImage = async(req,res) => {
  console.log(req);
  res.send({status:true});
}

const uploadMultipleImages = async(req,res) => {
  console.log(req);
  res.send({status:true});
}

// SERVER REST API's
const signUp = async(req,res) => {
  try{
    const{body:{fname,lname,password}} = req;
    const { doc, errors } = await Users.signUp({fname,lname,password});
    if(doc){
      res.send(doc);
    }
    res.send(errors)
  }
  catch(e){
    res.send(e)
  }
}

const signIn = async (req,res) => {
  try{
    const { body:{ fname, password } } = req;
    // if username or password is not provided
    if (!fname || !password ) {
      // return 401 error is fname or password doesn't exist
      return res.status(401).end()
    }

    //check and get data from DB 
    const { doc, errors } =await Users.signIn({fname, password});
    console.log(doc);
    if(doc){
      res.send(doc);
    }
    res.send(errors)
  } catch(e) {
    res.send(e)
  }
 
};

const usersList = async(req,res) => {
  try{
    const {body:{userId}, headers: {authorization}} = req;
    const { doc, errors } = await Users.getUsersList({userId},authorization);
    if(doc){
      res.send(doc);
    }
    res.send(errors)
  }
  catch(e){
    res.send(e)
  }
};
  
   
  module.exports = { signIn, users, getFileUserInfo, getUserById, addUser,deleteUser, uploadImage, uploadMultipleImages, signUp, usersList};
  