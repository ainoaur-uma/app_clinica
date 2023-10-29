// Importar el modelo
const Medicamentos = require('../models/medicamentosModel');

// Crea un nuevo medicamento: inserta un nuevo medicamento en la bd
exports.create = (req, res) => {
  // Obtiene los datos del nuevo medicamento desde la solicitud (req.body)
  const nuevoMedicamento = {
    nombre_medicamento: req.body.nombre_medicamento,
    principio_activo: req.body.principio_activo,
    descripcion_medicamento: req.body.descripcion_medicamento,
    fecha_caducidad: req.body.fecha_caducidad,
    forma_dispensacion: req.body.forma_dispensacion,
  };

  // Lógica para insertar el nuevo medicamento en la base de datos
  Medicamentos.create(nuevoMedicamento, (err, medicamento) => {
    if (err) {
      console.error('Error al crear el medicamento:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al crear el medicamento', error: err });
    }
    return res.status(201).json(medicamento);
  });
};

// Obtiene todos los medicamentos de la bd
exports.findAll = (req, res) => {
  Medicamentos.getAll((err, medicamentos) => {
    if (err) {
      console.error('Error al obtener los medicamentos:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al obtener los medicamentos', error: err });
    }
    return res.status(200).json(medicamentos);
  });
};

// Obtiene un medicamento por su ID
exports.findOne = (req, res) => {
  const medicamentoId = req.params.medicamentoId; // Obtiene el ID del medicamento desde los parámetros de la URL
  Medicamentos.findById(medicamentoId, (err, medicamento) => {
    if (err) {
      console.error('Error al obtener el medicamento por su ID:', err);
      return res.status(500).json({
        mensaje: 'Error al obtener el medicamento por su ID',
        error: err,
      });
    }
    if (!medicamento) {
      return res.status(404).json({ mensaje: 'Medicamento no encontrado' });
    }
    return res.status(200).json(medicamento);
  });
};

// Obtiene un medicamento por su nombre
exports.findByNombre = (req, res) => {
  const nombre = req.params.nombre;
  Medicamentos.findByNombre(nombre, (err, medicamentos) => {
    if (err) {
      console.error('Error al obtener los medicamentos por nombre:', err);
      return res.status(500).json({
        mensaje: 'Error al obtener los medicamentos por nombre',
        error: err,
      });
    }
    if (!medicamentos || medicamentos.length === 0) {
      return res.status(404).json({ mensaje: 'Medicamentos no encontrados' });
    }
    return res.status(200).json(medicamentos);
  });
};

// Obtiene un medicamento por su principio activo
exports.findByPrincipioActivo = (req, res) => {
  const principioActivo = req.params.principioActivo;
  Medicamentos.findByPrincipioActivo(principioActivo, (err, medicamentos) => {
    if (err) {
      console.error(
        'Error al obtener los medicamentos por principio activo:',
        err
      );
      return res.status(500).json({
        mensaje: 'Error al obtener los medicamentos por principio activo',
        error: err,
      });
    }
    if (!medicamentos || medicamentos.length === 0) {
      return res.status(404).json({ mensaje: 'Medicamentos no encontrados' });
    }
    return res.status(200).json(medicamentos);
  });
};

// Actualiza un medicamento por su ID
exports.update = (req, res) => {
  const medicamentoId = req.params.medicamentoId;
  const updatedData = {
    nombre_medicamento: req.body.nombre_medicamento,
    principio_activo: req.body.principio_activo,
    descripcion_medicamento: req.body.descripcion_medicamento,
    fecha_caducidad: req.body.fecha_caducidad,
    forma_dispensacion: req.body.forma_dispensacion,
  };
  // Lógica para actualizar el medicamento
  Medicamentos.updateById(medicamentoId, updatedData, (err, result) => {
    if (err) {
      console.error('Error al actualizar el medicamento por su ID:', err);
      return res.status(500).json({
        mensaje: 'Error al actualizar el medicamento por su ID',
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Medicamento no encontrado' });
    }

    return res
      .status(200)
      .json({ mensaje: 'Medicamento actualizado exitosamente' });
  });
};

// Elimina un medicamento por su ID
exports.delete = (req, res) => {
  const medicamentoId = req.params.medicamentoId;

  Medicamentos.remove(medicamentoId, (err, result) => {
    if (err) {
      console.error('Error al eliminar el medicamento por su ID:', err);
      return res.status(500).json({
        mensaje: 'Error al eliminar el medicamento por su ID',
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Medicamento no encontrado' });
    }

    return res
      .status(200)
      .json({ mensaje: 'Medicamento eliminado exitosamente' });
  });
};

// Exportamos las funciones del controlador
module.exports = {
  create: exports.create,
  findAll: exports.findAll,
  findOne: exports.findOne,
  findByNombre: exports.findByNombre,
  findByPrincipioActivo: exports.findByPrincipioActivo,
  update: exports.update,
  delete: exports.delete,
  findByPrincipioActivo: exports.findByPrincipioActivo,
};
