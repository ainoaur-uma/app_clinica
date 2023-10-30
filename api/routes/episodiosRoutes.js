const express = require('express');
const router = express.Router();
const episodiosController = require('../controllers/episodiosController');

// Ruta para crear un nuevo episodio
router.post('/', episodiosController.create);

// Ruta para obtener todos los episodios
router.get('/', episodiosController.findAll);

// Ruta para obtener un episodio por su ID
router.get('/:episodioId', episodiosController.findOne);

// Ruta para actualizar un episodio por su ID
router.put('/:episodioId', episodiosController.update);

// Ruta para eliminar un episodio por su ID
router.delete('/:episodioId', episodiosController.delete);

// Exportamos el enrutador
module.exports = router;
