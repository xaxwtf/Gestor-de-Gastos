
const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoria');
const verificarSesion = require('../middlewares/authMiddlewares');

const {
    listarGastos,
    crearGasto,
    obtenerGasto,
    editarGasto,
    eliminarGasto
} = require('../controllers/gastoController');

// Listar todos los gastos
router.get('/', listarGastos);

// Mostrar formulario para crear un gasto
router.get('/crear', async (req, res) => {
    try {
        const categorias = await Categoria.find().sort({ nombre: 1 });
        res.render('gastos/crear', { categorias });
    } catch (error) {
        console.log("HAY UNA EXEPCCION")
        res.status(500).send(error.message);
    }
});

// Crear un gasto
router.post('/', verificarSesion, crearGasto);

// Obtener un gasto para editar
router.get('/:id',verificarSesion, obtenerGasto);

// Actualizar un gasto
router.put('/:id', verificarSesion ,editarGasto);

// Eliminar un gasto
router.delete('/:id', verificarSesion, eliminarGasto);

module.exports = router;
