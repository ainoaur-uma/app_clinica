const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController.js');

// Ruta para crear un nuevo rol
router.post('/', rolesController.create);

// Ruta para obtener todos los roles
router.get('/', rolesController.findAll);

// Ruta para obtener un rol por su ID
router.get('/:rolId', rolesController.findOne);

// Ruta para actualizar un rol por su ID
router.put('/:rolId', rolesController.update);

// Ruta para eliminar un rol por su ID
router.delete('/:rolId', rolesController.delete);

//exportamos el enrutador:
module.exports = router;
