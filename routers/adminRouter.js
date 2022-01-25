const router = require('express').Router();
const { adminLogin } = require('../controllers/adminController');

router.get('/', (req, res) => {
  res.send("admin router is working")
})

router.post('/login', adminLogin);

module.exports = router;