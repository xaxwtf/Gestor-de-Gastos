
const mongoose = require('mongoose');
const Gasto = require('../models/Gasto');

// Mostrar estadísticas del usuario
const mostrarEstadisticas = async (req, res) => {
    try {
        const usuarioId = new mongoose.Types.ObjectId(req.session.usuarioId);

        // 1. Total de gastos por categoría
        const gastosPorCategoria = await Gasto.aggregate([
            {
                $match: { usuarioId }
            },
            {
                $group: {
                    _id: '$categoriaId',
                    total: { $sum: '$monto' },
                    cantidad: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'categorias',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'categoria'
                }
            },
            {
                $unwind: '$categoria'
            },
            {
                $project: {
                    _id: 0,
                    categoria: '$categoria.nombre',
                    total: 1,
                    cantidad: 1
                }
            },
            {
                $sort: { total: -1 }
            }
        ]);

        // 2. Total de gastos por mes
        const gastosPorMes = await Gasto.aggregate([
            {
                $match: { usuarioId }
            },
            {
                $group: {
                    _id: {
                        anio: { $year: '$fecha' },
                        mes: { $month: '$fecha' }
                    },
                    total: { $sum: '$monto' },
                    cantidad: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    anio: '$_id.anio',
                    mes: '$_id.mes',
                    total: 1,
                    cantidad: 1
                }
            },
            {
                $sort: {
                    anio: 1,
                    mes: 1
                }
            }
        ]);

        // 3. Total de gastos por método de pago
        const gastosPorMetodo = await Gasto.aggregate([
            {
                $match: { usuarioId }
            },
            {
                $group: {
                    _id: '$metodoPago',
                    total: { $sum: '$monto' },
                    cantidad: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    metodoPago: '$_id',
                    total: 1,
                    cantidad: 1
                }
            },
            {
                $sort: { total: -1 }
            }
        ]);

        res.render('estadisticas/index', {
            gastosPorCategoria,
            gastosPorMes,
            gastosPorMetodo
        });

    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).send('Error al obtener las estadísticas');
    }
};

module.exports = {
    mostrarEstadisticas
};
