const mongoose = require('mongoose');

const gastoSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true,
        trim: true
    },

    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    categoriaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },

    monto: {
        type: Number,
        required: true,
        min: 0.01
    },

    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },

    metodoPago: {
        type: String,
        enum: ['Efectivo', 'Débito', 'Crédito', 'Transferencia', 'Otro'],
        default: 'Efectivo'
    }
});

module.exports = mongoose.model('Gasto', gastoSchema);