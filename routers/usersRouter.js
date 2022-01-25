const router = require('express').Router();
const { addUser, userLogin, getAllUsers, updateUser, updateUserStatus, deleteUser, uploadFile } = require('../controllers/usersController');
const { addUserValidators, addUserValidationHandler } = require("../middlewares/user/userValidators");
const fileUpload = require("../middlewares/user/fileUpload");

router.get('/', (req, res) => {
  res.send("User router is working")
})

router.post('/register', addUserValidators ,addUserValidationHandler, addUser)
router.post('/login', userLogin)
router.post('/file/upload', fileUpload, uploadFile)

router.get('/allUsers', getAllUsers)

router.put('/user/:email', updateUser)
router.put('/:status/:email', updateUserStatus)

router.delete('/user/:email', deleteUser)



module.exports = router;