const express = require('express');
const router = express.Router();

const {
    login,
    registro,
    logout
} = require('../controllers/authController');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', login);

router.get('/registro', (req, res) => {
    res.render('auth/registro');
});

router.post('/registro', registro);

router.post('/logout', logout);

module.exports = router;