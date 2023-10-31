// Importar el modelo
const Usuarios = require('../models/usuariosModel');

// Crea un nuevo usuario: inserta un nuevo usuario en la base de datos
exports.create = (req, res) => {
  // Obtiene los datos del nuevo usuario desde la solicitud (req.body)
  const nuevoUsuario = {
    username: req.body.username,
    password: req.body.password,
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
    escuela: req.body.escuela,
    rol_id: req.body.rol_id,
    colegiado: req.body.colegiado,
  };

  // Lógica para insertar el nuevo usuario en la base de datos
  Usuarios.create(nuevoUsuario, (err, usuario) => {
    if (err) {
      console.error('Error al crear el usuario:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al crear el usuario', error: err });
    }
    return res.status(201).json(usuario);
  });
};

// Obtiene todos los usuarios de la base de datos
exports.findAll = (req, res) => {
  Usuarios.getAll((err, usuarios) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al obtener los usuarios', error: err });
    }
    return res.status(200).json(usuarios);
  });
};

// Obtiene un usuario por su ID
exports.findOne = (req, res) => {
  const id = req.params.id; // Obtiene el ID del usuario desde los parámetros de la URL
  Usuarios.findById(id, (err, usuario) => {
    if (err) {
      console.error('Error al obtener el usuario por su ID:', err);
      return res.status(500).json({
        mensaje: 'Error al obtener el usuario por su ID',
        error: err,
      });
    }
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    return res.status(200).json(usuario);
  });
};

// Actualiza un usuario por su ID
exports.update = (req, res) => {
  const id = req.params.id;

  // Lógica para obtener el usuario actual
  Usuarios.findById(id, (err, currentUsuario) => {
    if (err) {
      console.error('Error al obtener el usuario actual:', err);
      return res
        .status(500)
        .json({ mensaje: 'Error al obtener el usuario actual', error: err });
    }

    if (!currentUsuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const updatedData = req.body;

    // Actualiza toda la información del usuario según los datos proporcionados en la solicitud
    const updatedUsuario = { ...currentUsuario, ...updatedData };

    // Luego, actualiza el usuario en la base de datos
    Usuarios.updateById(id, updatedUsuario, (err, result) => {
      if (err) {
        console.error('Error al actualizar el usuario por su ID:', err);
        return res.status(500).json({
          mensaje: 'Error al actualizar el usuario por su ID',
          error: err,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      return res
        .status(200)
        .json({ mensaje: 'Usuario actualizado exitosamente' });
    });
  });
};

// Elimina un usuario por su ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Usuarios.remove(id, (err, result) => {
    if (err) {
      console.error('Error al eliminar el usuario por su ID:', err);
      return res.status(500).json({
        mensaje: 'Error al eliminar el usuario por su ID',
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    return res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
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
