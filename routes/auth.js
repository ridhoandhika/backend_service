const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.post('/login', authController.login)
// router.post('/', UserController.store)
// router.get('/:id', UserController.findById)
// userRrouterouter.put('/:id', UserController.update)
// router.delete('/:id', UserController.destroy)

module.exports = router