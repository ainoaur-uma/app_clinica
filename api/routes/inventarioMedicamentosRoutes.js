const express = require('express');
const router = express.Router();
const inventarioMedicamentosController = require('../controllers/inventarioMedicamentosController.js');

// Ruta para crear un nuevo registro de inventario de medicamento
router.post('/', inventarioMedicamentosController.create);

// Ruta para obtener todos los registros de inventario de medicamentos
router.get('/', inventarioMedicamentosController.findAll);

// Ruta para obtener un registro de inventario de medicamento por su ID
router.get(
  '/:inventarioMedicamentoId',
  inventarioMedicamentosController.findOne
);

// Ruta para actualizar un registro de inventario de medicamento por su ID
router.put(
  '/:inventarioMedicamentoId',
  inventarioMedicamentosController.update
);

// Ruta para eliminar un registro de inventario de medicamento por su ID
router.delete(
  '/:inventarioMedicamentoId',
  inventarioMedicamentosController.delete
);

// Exportamos el enrutador
module.exports = router;
