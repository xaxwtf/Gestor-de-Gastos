
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');

const app = express();

// Archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Configuración de sesiones
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
}));

// Rutas de autenticación
app.use('/auth', require('./routes/authRoutes'));

// Ruta del menú principal
app.get('/', (req, res) => {
    if (!req.session.usuarioId) {
        return res.redirect('/auth/login');
    }

    res.render('index');
});

// Rutas de la aplicación
app.use('/gastos', require('./routes/gastoRoutes'));
// app.use('/estadisticas', require('./routes/estadisticaRoutes'));

module.exports = app;
