// Importa el modelo
const Episodios = require('../models/episodiosModel');

// Crea un nuevo episodio: inserta un nuevo episodio en la base de datos
exports.create = (req, res) => {
  // Obtiene los datos del nuevo episodio desde la solicitud (req.body)
  const nuevoEpisodio = {
    NHC: req.body.NHC,
    fecha_episodio: req.body.fecha_episodio,
    tipo_asistencia: req.body.tipo_asistencia,
    motivo_consulta: req.body.motivo_consulta,
    anamnesis: req.body.anamnesis,
    diagnostico: req.body.diagnostico,
    tratamiento: req.body.tratamiento,
  };

  // Lógica para insertar el nuevo episodio en la base de datos
  Episodios.create(nuevoEpisodio, (err, episodio) => {
    if (err) {
      console.error('Error al crear el episodio:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al crear el episodio', error: err });
    }
    return res.status(201).json(episodio);
  });
};

// Obtiene todos los episodios
exports.findAll = (req, res) => {
  Episodios.getAll((err, episodios) => {
    if (err) {
      console.error('Error al obtener los episodios:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al obtener los episodios', error: err });
    }
    return res.status(200).json(episodios);
  });
};

// Obtiene un episodio por su ID
exports.findOne = (req, res) => {
  const episodioId = req.params.episodioId; // Obtiene el ID del episodio desde los parámetros de la URL
  Episodios.findById(episodioId, (err, episodio) => {
    if (err) {
      console.error('Error al obtener el episodio por su ID:', err);
      return res
        .status(500)
        .json({
          mensaje: 'Error al obtener el episodio por su ID',
          error: err,
        });
    }
    if (!episodio) {
      return res.status(404).json({ mensaje: 'Episodio no encontrado' });
    }
    return res.status(200).json(episodio);
  });
};

// Actualiza un episodio por su ID sin borrar datos previos
exports.update = (req, res) => {
  const episodioId = req.params.episodioId;

  // Lógica para obtener el episodio actual
  Episodios.findById(episodioId, (err, currentEpisodio) => {
    if (err) {
      console.error('Error al obtener el episodio actual:', err);
      return res.status(500).json({
        mensaje: 'Error al obtener el episodio actual',
        error: err,
      });
    }

    if (!currentEpisodio) {
      return res.status(404).json({ mensaje: 'Episodio no encontrado' });
    }

    const updatedData = req.body;

    // Actualiza todo el episodio según los datos proporcionados en la solicitud
    const updatedEpisodio = { ...currentEpisodio, ...updatedData };

    // Luego, actualiza el episodio en la base de datos
    Episodios.updateById(episodioId, updatedEpisodio, (err, result) => {
      if (err) {
        console.error('Error al actualizar el episodio por su ID:', err);
        return res.status(500).json({
          mensaje: 'Error al actualizar el episodio por su ID',
          error: err,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: 'Episodio no encontrado' });
      }

      return res.status(200).json({
        mensaje: 'Episodio actualizado exitosamente',
      });
    });
  });
};

// Elimina un episodio por su ID
exports.delete = (req, res) => {
  const episodioId = req.params.episodioId;

  Episodios.remove(episodioId, (err, result) => {
    if (err) {
      console.error('Error al eliminar el episodio por su ID:', err);
      return res.status(500).json({
        mensaje: 'Error al eliminar el episodio por su ID',
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Episodio no encontrado' });
    }

    return res.status(200).json({
      mensaje: 'Episodio eliminado exitosamente',
    });
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
