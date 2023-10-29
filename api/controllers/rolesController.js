// Importar el modelo
const Roles = require('../models/rolesModel');

// Crea un nuevo rol: inserta un nuevo rol en la bd
exports.create = (req, res) => {
  // Obtiene los datos del nuevo rol desde la solicitud (req.body)
  const nuevoRol = {
    nombre: req.body.nombre,
  };

  // Lógica para insertar el nuevo rol en la base de datos
  Roles.create(nuevoRol, (err, rol) => {
    if (err) {
      console.error('Error al crear el rol:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al crear el rol', error: err });
    }
    return res.status(201).json(rol);
  });
};

// Obtiene todos los roles de la bd
exports.findAll = (req, res) => {
  Roles.getAll((err, roles) => {
    if (err) {
      console.error('Error al obtener los roles:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al obtener los roles', error: err });
    }
    return res.status(200).json(roles);
  });
};

// Obtiene un rol por su ID
exports.findOne = (req, res) => {
  const rolId = req.params.rolId; // Obtiene el ID del rol desde los parámetros de la URL
  Roles.findById(rolId, (err, rol) => {
    if (err) {
      console.error('Error al obtener el rol por su ID:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al obtener el rol por su ID', error: err });
    }
    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }
    return res.status(200).json(rol);
  });
};

// Actualiza un rol por su ID
exports.update = (req, res) => {
  const rolId = req.params.rolId;
  const updatedData = {
    nombre: req.body.nombre,
  };
  // Lógica para actualizar el rol
  Roles.updateById(rolId, updatedData, (err, result) => {
    if (err) {
      console.error('Error al actualizar el rol por su ID:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al actualizar el rol por su ID', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Rol actualizado exitosamente' });
  });
};

// Elimina un rol por su ID
exports.delete = (req, res) => {
  const rolId = req.params.rolId;

  Roles.remove(rolId, (err, result) => {
    if (err) {
      console.error('Error al eliminar el rol por su ID:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al eliminar el rol por su ID', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Rol no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Rol eliminado exitosamente' });
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
