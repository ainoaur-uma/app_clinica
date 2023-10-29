const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/pacientesController.js');

// Ruta para crear un nuevo paciente
router.post('/', pacientesController.create);

// Ruta para obtener todos los pacientes
router.get('/', pacientesController.findAll);

// Ruta para obtener un paciente por su NHC
router.get('/:NHC', pacientesController.findOne);

// Ruta para obtener pacientes por su nombre
router.get('/nombre/:nombre', pacientesController.findByNombre);

// Ruta para obtener pacientes por su apellido
router.get('/apellido/:apellido', pacientesController.findByApellido);

// Ruta para actualizar un paciente por su NHC
router.put('/:NHC', pacientesController.update);

// Ruta para eliminar un paciente por su NHC
router.delete('/:NHC', pacientesController.delete);

// Exportamos el enrutador
module.exports = router;
