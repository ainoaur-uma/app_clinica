const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController.js');

// Ruta para crear un nuevo usuario
router.post('/', usuariosController.create);

// Ruta para obtener todos los usuarios
router.get('/', usuariosController.findAll);

// Ruta para obtener un usuario por su ID
router.get('/:id', usuariosController.findOne);

// Ruta para actualizar un usuario por su ID
router.put('/:id', usuariosController.update);

// Ruta para eliminar un usuario por su ID
router.delete('/:id', usuariosController.delete);

// Exportamos el enrutador
module.exports = router;
