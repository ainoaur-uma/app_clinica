const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbConnection = require('./db_connection');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');

// Parse application/json
app.use(bodyParser.json());

// Ruta para servir archivos estáticos de Angular
app.use(express.static(path.join(__dirname, 'front/dist/index.html')));

//cors:
app.use(cors());

// Importa las rutas de las entidades
const usuariosRoutes = require('../api/routes/usuariosRoutes');
const rolesRoutes = require('../api/routes/rolesRoutes');
const agendasRoutes = require('../api/routes/agendasRoutes');
const citasRoutes = require('../api/routes/citasRoutes');
const medicamentosRoutes = require('../api/routes/medicamentosRoutes');
const inventarioMedicamentosRoutes = require('../api/routes/inventarioMedicamentosRoutes');
const pacientesRoutes = require('../api/routes/pacientesRoutes');
const hceRoutes = require('../api/routes/hceRoutes');
const episodiosRoutes = require('../api/routes/episodiosRoutes');

// Define las rutas para las entidades
app.use('/usuarios', usuariosRoutes);
app.use('/roles', rolesRoutes);
app.use('/agendas', agendasRoutes);
app.use('/citas', citasRoutes);
app.use('/medicamentos', medicamentosRoutes);
app.use('/inventarioMedicamentos', inventarioMedicamentosRoutes);
app.use('/pacientes', pacientesRoutes);
app.use('/hce', hceRoutes);
app.use('/episodios', episodiosRoutes);

// Ruta raíz para la página de inicio
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación de la clínica!');
});

// Ruta para servir la aplicación Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front/dist/index.html'));
});
module.exports = app;
