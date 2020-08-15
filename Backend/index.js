const express = require('express');
const app = express();
const database = require('./modules/db');
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Rutas
const appRoutes = require('./routes/app');
const usuarioRoutes = require('./routes/usuario');
const loginRoutes = require('./routes/login');
const proyectoRoutes = require('./routes/proyecto');
const snippetRoutes = require('./routes/snippet');
const busquedaRoutes = require('./routes/busqueda');
const uploadRoutes = require('./routes/upload');
const imagenesRoutes = require('./routes/imagenes');
// Middlewares
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/proyecto', proyectoRoutes);
app.use('/snippet', snippetRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/imagen', imagenesRoutes);
app.use('/', appRoutes);



app.listen(3000, () => {
    console.log('Servidor levantado');
})