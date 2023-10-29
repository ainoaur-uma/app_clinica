const express = require('express');
const router = express.Router();
const medicamentosController = require('../controllers/medicamentosController.js');

// Ruta para crear un nuevo medicamento
router.post('/', medicamentosController.create);

// Ruta para obtener todos los medicamentos
router.get('/', medicamentosController.findAll);

// Ruta para obtener un medicamento por su ID
router.get('/:medicamentoId', medicamentosController.findOne);

// Ruta para actualizar un medicamento por su ID
router.put('/:medicamentoId', medicamentosController.update);

// Ruta para eliminar un medicamento por su ID
router.delete('/:medicamentoId', medicamentosController.delete);

// Exportamos el enrutador
module.exports = router;
