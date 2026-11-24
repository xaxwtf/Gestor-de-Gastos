const express = require('express');
const router = express.Router();

const {
    login,
    registro
} = require('../controllers/authController');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', login);

router.get('/registro', (req, res) => {
    res.render('auth/registro');
});

router.post('/registro', registro);

module.exports = router;