const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbConnection = require('./db_connection');
const dotenv = require('dotenv').config();

// Parse application/json
app.use(bodyParser.json());

const rolesRoutes = require('../api/routes/rolesRoutes');
const agendasRoutes = require('../api/routes/agendasRoutes');
const citasRoutes = require('../api/routes/citasRoutes');
const medicamentosRoutes = require('../api/routes/medicamentosRoutes');
const inventarioMedicamentosRoutes = require('../api/routes/inventarioMedicamentosRoutes');
const pacientesRoutes = require('../api/routes/pacientesRoutes');
const hceRoutes = require('../api/routes/hceRoutes');
const usuariosRoutes = require('../api/routes/usuariosRoutes');

app.use('/roles', rolesRoutes);
app.use('/agendas', agendasRoutes);
app.use('/citas', citasRoutes);
app.use('/medicamentos', medicamentosRoutes);
app.use('/inventarioMedicamentos', inventarioMedicamentosRoutes);
app.use('/pacientes', pacientesRoutes);
app.use('/hce', hceRoutes);
app.use('/usuarios', usuariosRoutes);

// Obtiene el puerto desde las variables de entorno o utiliza un valor predeterminado
const port = process.env.PORT || 3000;

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

// Ruta raíz para la página de inicio
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación de la clínica!');
});
