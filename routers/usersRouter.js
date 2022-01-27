const router = require('express').Router();
const { addUser, userLogin, getAllUsers, updateUser, updateUserStatus, deleteUser, uploadFile } = require('../controllers/usersController');
//const { addUserValidators, addUserValidationHandler } = require("../middlewares/user/userValidators");
const fileUpload = require("../middlewares/user/fileUpload");

router.get('/', (req, res) => {
  res.send("User router is working")
})

router.post('/register', addUser)
router.post('/login', userLogin)

router.post('/file/upload', fileUpload, uploadFile)

router.get('/allUsers', getAllUsers)

router.put('/user/:id', updateUser)
router.put('/:id/:status', updateUserStatus)

router.delete('/user/:id', deleteUser)



module.exports = router;