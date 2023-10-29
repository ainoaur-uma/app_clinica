// Importar el modelo
const Agendas = require('../models/agendasModel');

// Crea una nueva agenda: inserta una nueva agenda en la bd
exports.create = (req, res) => {
  // Obtiene los datos de la nueva agenda desde la solicitud (req.body)
  const nuevaAgenda = {
    descripcion: req.body.descripcion,
    horario: req.body.horario,
  };

  // Lógica para insertar la nueva agenda en la base de datos
  Agendas.create(nuevaAgenda, (err, agenda) => {
    if (err) {
      console.error('Error al crear la agenda:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al crear la agenda', error: err });
    }
    return res.status(201).json(agenda);
  });
};

// Obtiene todas las agendas de la bd
exports.findAll = (req, res) => {
  Agendas.getAll((err, agendas) => {
    if (err) {
      console.error('Error al obtener las agendas:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al obtener las agendas', error: err });
    }
    return res.status(200).json(agendas);
  });
};

// Obtiene una agenda por su ID
exports.findOne = (req, res) => {
  const agendaId = req.params.agendaId; // Obtiene el ID de la agenda desde los parámetros de la URL
  Agendas.findById(agendaId, (err, agenda) => {
    if (err) {
      console.error('Error al obtener la agenda por su ID:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al obtener la agenda por su ID', error: err });
    }
    if (!agenda) {
      return res.status(404).json({ mensaje: 'Agenda no encontrada' });
    }
    return res.status(200).json(agenda);
  });
};

// Actualiza una agenda por su ID sin borrar datos previos
exports.updateById = (req, res) => {
  const agendaId = req.params.agendaId;
  const updatedData = {
    descripcion: req.body.descripcion,
    horario: req.body.horario,
  };

  // Lógica para actualizar la agenda por ID sin borrar datos previos
  Agendas.findById(agendaId, (err, currentAgenda) => {
    if (err) {
      console.error('Error al obtener la agenda actual:', err);
      return res.status(500).json({
        mensaje: 'Error al obtener la agenda actual',
        error: err,
      });
    }

    if (!currentAgenda) {
      return res.status(404).json({ mensaje: 'Agenda no encontrada' });
    }

    // Fusiona los datos actuales con los nuevos datos
    const updatedAgenda = { ...currentAgenda, ...updatedData };

    // Luego, actualiza la agenda en la base de datos
    Agendas.updateById(agendaId, updatedAgenda, (err, result) => {
      if (err) {
        console.error('Error al actualizar la agenda por su ID:', err);
        return res.status(500).json({
          mensaje: 'Error al actualizar la agenda por su ID',
          error: err,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: 'Agenda no encontrada' });
      }

      return res
        .status(200)
        .json({ mensaje: 'Agenda actualizada exitosamente' });
    });
  });
};

// Elimina una agenda por su ID
exports.delete = (req, res) => {
  const agendaId = req.params.agendaId;

  Agendas.remove(agendaId, (err, result) => {
    if (err) {
      console.error('Error al eliminar la agenda por su ID:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al eliminar la agenda por su ID', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Agenda no encontrada' });
    }

    return res.status(200).json({ mensaje: 'Agenda eliminada exitosamente' });
  });
};

// Exportamos las funciones del controlador
module.exports = {
  create: exports.create,
  findAll: exports.findAll,
  findOne: exports.findOne,
  updateById: exports.updateById,
  delete: exports.delete,
};
