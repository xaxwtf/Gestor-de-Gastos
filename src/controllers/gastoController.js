
const Gasto = require('../models/Gasto');
const Categoria = require('../models/categoria');

// Listar todos los gastos
const listarGastos = async (req, res) => {
    try {
        const gastos = await Gasto.find().sort({ fecha: -1 });
        res.render('gastos/listar', { gastos });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Crear un gasto
const crearGasto = async (req, res) => {
    try {
        const nombreCategoria = req.body.categoria.trim();

        let categoria = await Categoria.findOne({
            nombre: nombreCategoria
        });

        // Si no existe, la creamos
        if (!categoria) {
            categoria = await Categoria.create({
                nombre: nombreCategoria
            });
        }

        const nuevoGasto = new Gasto(req.body);

        nuevoGasto.usuarioId = req.session.usuarioId;
        nuevoGasto.categoriaId = categoria._id;

        await nuevoGasto.save();

        res.redirect('/gastos');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Obtener un gasto por ID
const obtenerGasto = async (req, res) => {
    try {
        const gasto = await Gasto.findById(req.params.id);

        if (!gasto) {
            return res.status(404).send('Gasto no encontrado');
        }

        res.render('gastos/editar', { gasto });
    } catch (error) {
        res.status(400).send('ID inválido');
    }
};

// Editar un gasto
const editarGasto = async (req, res) => {
    try {
        const gasto = await Gasto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!gasto) {
            return res.status(404).send('Gasto no encontrado');
        }

        res.redirect('/gastos');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Eliminar un gasto
const eliminarGasto = async (req, res) => {
    try {
        const gasto = await Gasto.findByIdAndDelete(req.params.id);

        if (!gasto) {
            return res.status(404).send('Gasto no encontrado');
        }

        res.redirect('/gastos');
    } catch (error) {
        res.status(400).send('No se pudo eliminar el gasto');
    }
};

module.exports = {
    listarGastos,
    crearGasto,
    obtenerGasto,
    editarGasto,
    eliminarGasto
};
