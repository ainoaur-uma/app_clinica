const express = require('express');
const router = express.Router();
const hceController = require('../controllers/hceController.js');

// Ruta para crear una nueva Historia Clínica Electrónica (HCE)
router.post('/', hceController.create);

// Ruta para obtener todas las Historias Clínicas Electrónicas (HCE)
router.get('/', hceController.findAll);

// Ruta para obtener una Historia Clínica Electrónica (HCE) por el NHC del paciente
router.get('/:NHC', hceController.findOne);

// Ruta para actualizar una Historia Clínica Electrónica (HCE) por el NHC del paciente
router.put('/:NHC', hceController.updateByNHC);

// Ruta para eliminar una Historia Clínica Electrónica (HCE) por el NHC del paciente
router.delete('/:NHC', hceController.delete);

// Exportamos el enrutador
module.exports = router;
