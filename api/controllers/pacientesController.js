// Importar el modelo
const Pacientes = require('../models/pacientesModel');

// Crea un nuevo paciente: inserta un nuevo paciente en la bd
exports.create = (req, res) => {
  // Obtiene los datos del nuevo paciente desde la solicitud (req.body)
  const nuevoPaciente = {
    NHC: req.body.NHC,
    carnet_identidad: req.body.carnet_identidad,
    nombre: req.body.nombre,
    apellido1: req.body.apellido1,
    apellido2: req.body.apellido2,
    fecha_nacimiento: req.body.fecha_nacimiento,
    telefono: req.body.telefono,
    email: req.body.email,
    departamento: req.body.departamento,
    municipio: req.body.municipio,
    colonia: req.body.colonia,
    direccion: req.body.direccion,
    tutor_info: req.body.tutor_info,
    grado: req.body.grado,
    escuela: req.body.escuela,
    otra_info: req.body.otra_info,
  };

  // Lógica para insertar el nuevo paciente en la base de datos
  Pacientes.create(nuevoPaciente, (err, paciente) => {
    if (err) {
      console.error('Error al crear el paciente:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al crear el paciente', error: err });
    }
    return res.status(201).json(paciente);
  });
};

// Obtiene todos los pacientes de la bd
exports.findAll = (req, res) => {
  Pacientes.getAll((err, pacientes) => {
    if (err) {
      console.error('Error al obtener los pacientes:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al obtener los pacientes', error: err });
    }
    return res.status(200).json(pacientes);
  });
};

// Obtiene un paciente por su NHC
exports.findOne = (req, res) => {
  const NHC = req.params.NHC; // Obtiene el NHC del paciente desde los parámetros de la URL
  Pacientes.findByNHC(NHC, (err, paciente) => {
    if (err) {
      console.error('Error al obtener el paciente por su NHC:', err);
      return res.status(500).json({
        mensaje: 'Error al obtener el paciente por su NHC',
        error: err,
      });
    }
    if (!paciente) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }
    return res.status(200).json(paciente);
  });
};

// Obtiene pacientes por su nombre
exports.findByNombre = (req, res) => {
  const nombre = req.params.nombre;
  Pacientes.findByNombre(nombre, (err, pacientes) => {
    if (err) {
      console.error('Error al obtener los pacientes por nombre:', err);
      return res.status(500).json({
        mensaje: 'Error al obtener los pacientes por nombre',
        error: err,
      });
    }
    if (!pacientes || pacientes.length === 0) {
      return res.status(404).json({ mensaje: 'Pacientes no encontrados' });
    }
    return res.status(200).json(pacientes);
  });
};

// Obtiene pacientes por apellido (buscando en ambas columnas "apellido1" y "apellido2")
exports.findByApellido = (req, res) => {
  const apellido = req.params.apellido;
  Pacientes.findByApellido(apellido, (err, pacientes) => {
    if (err) {
      console.error('Error al obtener los pacientes por apellido:', err);
      return res.status(500).json({
        mensaje: 'Error al obtener los pacientes por apellido',
        error: err,
      });
    }
    if (!pacientes || pacientes.length === 0) {
      return res.status(404).json({ mensaje: 'Pacientes no encontrados' });
    }
    return res.status(200).json(pacientes);
  });
};

// Actualiza un paciente por su NHC
exports.update = (req, res) => {
  const NHC = req.params.NHC;
  const updatedData = {
    carnet_identidad: req.body.carnet_identidad,
    nombre: req.body.nombre,
    apellido1: req.body.apellido1,
    apellido2: req.body.apellido2,
    fecha_nacimiento: req.body.fecha_nacimiento,
    telefono: req.body.telefono,
    email: req.body.email,
    departamento: req.body.departamento,
    municipio: req.body.municipio,
    colonia: req.body.colonia,
    direccion: req.body.direccion,
    tutor_info: req.body.tutor_info,
    grado: req.body.grado,
    escuela: req.body.escuela,
    otra_info: req.body.otra_info,
  };

  // Lógica para actualizar el paciente
  Pacientes.updateByNHC(NHC, updatedData, (err, result) => {
    if (err) {
      console.error('Error al actualizar el paciente por su NHC:', err);
      return res.status(500).json({
        mensaje: 'Error al actualizar el paciente por su NHC',
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    return res
      .status(200)
      .json({ mensaje: 'Paciente actualizado exitosamente' });
  });
};

// Elimina un paciente por su NHC
exports.delete = (req, res) => {
  const NHC = req.params.NHC;

  Pacientes.remove(NHC, (err, result) => {
    if (err) {
      console.error('Error al eliminar el paciente por su NHC:', err);
      return res.status(500).json({
        mensaje: 'Error al eliminar el paciente por su NHC',
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Paciente eliminado exitosamente' });
  });
};

// Exportamos las funciones del controlador
module.exports = {
  create: exports.create,
  findAll: exports.findAll,
  findOne: exports.findOne,
  findByNombre: exports.findByNombre,
  findByApellido: exports.findByApellido,
  update: exports.update,
  delete: exports.delete,
};
