const express = require('express');
const router = express.Router();
const agendasController = require('../controllers/agendasController.js');

// Ruta para crear una nueva agenda
router.post('/', agendasController.create);

// Ruta para obtener todas las agendas
router.get('/', agendasController.findAll);

// Ruta para obtener una agenda por su ID
router.get('/:agendaId', agendasController.findOne);

// Ruta para actualizar una agenda por su ID
router.put('/:agendaId', agendasController.update);

// Ruta para eliminar una agenda por su ID
router.delete('/:agendaId', agendasController.delete);

// Exportamos el enrutador
module.exports = router;
