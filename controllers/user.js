
const fs = require('fs');
const path = require('path');
const { Users } = require('../services');
// const status = (req, res) => {
//     res.send({ status: 'ok', version: 1.0, name: "nodejs-boilerplate" });
//   };

//   const users = (req, res) => {
//     res.send({ status: 'ok', version: 1.0, name: "nodejs-boilerplate" });
//   };

//   const add = (req, res) => {
//     res.send({ status: 'ok', version: 1.0, name: "nodejs-boilerplate" });
//   };

//   const edit = (req, res) => {
//     res.send({ status: 'ok', version: 1.0, name: "nodejs-boilerplate" });
//   };

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

  const signIn = async (req,res) => {
    try{
      const { username, password } = req.body
      // if username or password is not provided
      if (!username || !password ) {
        // return 401 error is username or password doesn't exist
        return res.status(401).end()
      }

      //check and get data from DB 
      const { doc, errors } =await Users.signIn({username, password});
      console.log(doc);
      if(doc){
        res.send(doc);
      }
      res.send(errors)
    } catch(e) {
      res.send(e)
    }
   
  };

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
  const { body:{name,password,profession,id}} = req;
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

const uploadImage = async(req,res) => {
  console.log(req);
  res.send({status:true});
}

const uploadMultipleImages = async(req,res) => {
  console.log(req);
  res.send({status:true});
}
  
   
  module.exports = { signIn, users, getFileUserInfo, getUserById, addUser,deleteUser, uploadImage, uploadMultipleImages};
  