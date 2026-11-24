
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

// REGISTRO
const registro = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Comprobar si el correo ya existe
        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            return res.render('auth/registro', {
                error: 'El correo electrónico ya está registrado'
            });
        }

        // Generar hash de la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear usuario
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password: passwordHash
        });

        await nuevoUsuario.save();

        res.redirect('/auth/login');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar el usuario');
    }
};


// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por correo
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.render('auth/login', {
                error: 'Correo o contraseña incorrectos'
            });
        }

        // Comparar contraseña con el hash
        const passwordValida = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordValida) {
            return res.render('auth/login', {
                error: 'Correo o contraseña incorrectos'
            });
        }

        // Guardar ID del usuario en la sesión
        req.session.usuarioId = usuario._id;

        res.redirect('/');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al iniciar sesión');
    }
};
const logout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).send('Error al cerrar sesión');
        }

        res.clearCookie('connect.sid');
        res.redirect('/auth/login');
    });
};

module.exports = {
    registro,
    login,
    logout
};
