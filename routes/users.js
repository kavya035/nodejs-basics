const { signIn,users, getFileUserInfo, getUserById, addUser, deleteUser, uploadImage, uploadMultipleImages,signUp} = require('./../controllers/user');

const multer  = require('multer');
// const upload = multer({ dest: './uploads/' });
// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

module.exports = (router) => {
  // router.get('/ping', status);
  router.get('/users', users);
  // router.post('/addusers', addUser);
  // router.post('/editusers', edit);
  router.post('/signIn', signIn);
  router.post('/signup', signUp);
  // router.get('/listUsers', getFileUserInfo);
  // router.get('/:id', getUserById);
  // router.post('/addUser', addUser);
  // router.post('/deleteUser', deleteUser);
  // router.get('/getUserById/:id', getUserById);
  // router.post('/uploadUserImage',upload.single('profilePic'), uploadImage)

  // router.post('/uploadMultipleImages',upload.array('profilePic'), uploadMultipleImages)

};
