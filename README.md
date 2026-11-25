# Gestor de Gastos

## Descripción

La aplicación permite registrar distintos tipos de gastos, organizarlos por categorías y generar estadísticas para facilitar el seguimiento y análisis de los gastos realizados.

## Funcionamiento

1. El usuario inicia sesión con su correo electrónico y contraseña. Si todavía no tiene una cuenta, puede registrarse.
2. Una vez iniciada la sesión, accede al menú principal, desde donde puede:
   - Registrar nuevos gastos.
   - Consultar la lista de gastos registrados.
   - Visualizar estadísticas sobre sus gastos.
3. En el listado se pueden consultar los detalles de cada gasto y eliminar aquellos que ya no se desean conservar.

## Base de datos

La aplicación utiliza tres colecciones:

- **Usuarios:** almacena los datos de los usuarios registrados.
- **Categorías:** contiene las distintas categorías en las que se pueden clasificar los gastos.
- **Gastos:** almacena los gastos registrados.

La colección `Gastos` contiene dos referencias:
- `usuarioId`: relaciona cada gasto con el usuario que lo registró.
- `categoriaId`: relaciona cada gasto con su categoría correspondiente.

De esta manera, se establecen relaciones entre las tres colecciones mediante identificadores de MongoDB (`ObjectId`).

## Decisiones de diseño

Debido a que se trata de una aplicación sencilla de gestión de gastos, se decidió permitir la creación de usuarios y categorías, pero no su eliminación desde la interfaz.

Esta decisión busca mantener la integridad de los datos y evitar que se eliminen accidentalmente elementos que podrían estar relacionados con gastos ya registrados.


Tecnologías utilizadas

Node.js: entorno de ejecución de JavaScript.

Express: framework utilizado para gestionar el servidor y las rutas.

Mongoose: biblioteca utilizada para modelar los datos y comunicarse con MongoDB.

MongoDB Atlas: base de datos NoSQL alojada en la nube.

EJS: motor de plantillas para generar las vistas.

Bootstrap 5.3.3: framework CSS utilizado para el diseño de la interfaz.

Express-session: gestión de sesiones de usuario.

Bcrypt: cifrado hash de las contraseñas.
