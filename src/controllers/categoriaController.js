const Categoria = require('../models/categoria');

// Listar categorías
const listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find().sort({ nombre: 1 });

        res.render('categorias/listar', { categorias });

    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Buscar o crear categoría
const obtenerOCrearCategoria = async (nombre) => {
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
        throw new Error('El nombre de la categoría es obligatorio');
    }

    let categoria = await Categoria.findOne({
        nombre: { $regex: `^${nombreLimpio}$`, $options: 'i' }
    });

    if (!categoria) {
        categoria = await Categoria.create({
            nombre: nombreLimpio
        });
    }

    return categoria;
};

module.exports = {
    listarCategorias,
    obtenerOCrearCategoria
};