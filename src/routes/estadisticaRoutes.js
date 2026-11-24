
const express = require('express');
const router = express.Router();

const verificarSesion = require('../middlewares/authMiddlewares');
const { mostrarEstadisticas } = require('../controllers/estadisticaController');

router.get('/', verificarSesion, mostrarEstadisticas);

module.exports = router;
