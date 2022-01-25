const router = require('express').Router();
const { addUser, userLogin, getAllUsers, updateUser, updateUserStatus, deleteUser } = require('../controllers/usersController');
const { addUserValidators, addUserValidationHandler } = require("../middlewares/user/userValidators");

router.get('/', (req, res) => {
  res.send("User router is working")
})

router.post('/register', addUserValidators ,addUserValidationHandler, addUser)
router.post('/login', userLogin)

router.get('/allUsers', getAllUsers)

router.put('/user/:email', updateUser)
router.put('/:status/:email', updateUserStatus)

router.delete('/user/:email', deleteUser)



module.exports = router;