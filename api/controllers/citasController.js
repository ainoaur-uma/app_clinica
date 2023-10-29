// Importar el modelo
const Citas = require('../models/citasModel');

// Crea una nueva cita: inserta una nueva cita en la bd
exports.create = (req, res) => {
  // Obtiene los datos de la nueva cita desde la solicitud (req.body)
  const nuevaCita = {
    fecha: req.body.fecha,
    hora: req.body.hora,
    NHC: req.body.NHC,
    doctor_id: req.body.doctor_id,
    agenda_id: req.body.agenda_id,
    informacion_cita: req.body.informacion_cita,
  };

  // Lógica para insertar la nueva cita en la base de datos
  Citas.create(nuevaCita, (err, cita) => {
    if (err) {
      console.error('Error al crear la cita:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al crear la cita', error: err });
    }
    return res.status(201).json(cita);
  });
};

// Obtiene todas las citas de la bd
exports.findAll = (req, res) => {
  Citas.getAll((err, citas) => {
    if (err) {
      console.error('Error al obtener las citas:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al obtener las citas', error: err });
    }
    return res.status(200).json(citas);
  });
};

// Obtiene una cita por su ID
exports.findOne = (req, res) => {
  const citaId = req.params.citaId; // Obtiene el ID de la cita desde los parámetros de la URL
  Citas.findById(citaId, (err, cita) => {
    if (err) {
      console.error('Error al obtener la cita por su ID:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al obtener la cita por su ID', error: err });
    }
    if (!cita) {
      return res.status(404).json({ mensaje: 'Cita no encontrada' });
    }
    return res.status(200).json(cita);
  });
};

// Actualiza una cita por su ID
exports.update = (req, res) => {
  const citaId = req.params.citaId;
  const updatedData = {
    fecha: req.body.fecha,
    hora: req.body.hora,
    NHC: req.body.NHC,
    doctor_id: req.body.doctor_id,
    agenda_id: req.body.agenda_id,
    informacion_cita: req.body.informacion_cita,
  };
  // Lógica para actualizar la cita
  Citas.updateById(citaId, updatedData, (err, result) => {
    if (err) {
      console.error('Error al actualizar la cita por su ID:', err);
      return res.status(500).json({
        mensaje: 'Error al actualizar la cita por su ID',
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Cita no encontrada' });
    }

    return res.status(200).json({ mensaje: 'Cita actualizada exitosamente' });
  });
};

// Elimina una cita por su ID
exports.delete = (req, res) => {
  const citaId = req.params.citaId;

  Citas.remove(citaId, (err, result) => {
    if (err) {
      console.error('Error al eliminar la cita por su ID:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al eliminar la cita por su ID', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Cita no encontrada' });
    }

    return res.status(200).json({ mensaje: 'Cita eliminada exitosamente' });
  });
};

// Exportamos las funciones del controlador
module.exports = {
  create: exports.create,
  findAll: exports.findAll,
  findOne: exports.findOne,
  update: exports.update,
  delete: exports.delete,
};
