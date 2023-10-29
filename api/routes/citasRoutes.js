const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController.js');

// Ruta para crear una nueva cita
router.post('/', citasController.create);

// Ruta para obtener todas las citas
router.get('/', citasController.findAll);

// Ruta para obtener una cita por su ID
router.get('/:citaId', citasController.findOne);

// Ruta para actualizar una cita por su ID
router.put('/:citaId', citasController.update);

// Ruta para eliminar una cita por su ID
router.delete('/:citaId', citasController.delete);

// Exportamos el enrutador
module.exports = router;
