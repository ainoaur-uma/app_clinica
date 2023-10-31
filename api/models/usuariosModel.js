const db = require('../../server/db_connection');

const Usuarios = function (usuario) {
  this.id = usuario.id;
  this.username = usuario.username;
  this.password = usuario.password;
  this.carnet_identidad = usuario.carnet_identidad;
  this.nombre = usuario.nombre;
  this.apellido1 = usuario.apellido1;
  this.apellido2 = usuario.apellido2;
  this.fecha_nacimiento = usuario.fecha_nacimiento;
  this.telefono = usuario.telefono;
  this.email = usuario.email;
  this.departamento = usuario.departamento;
  this.municipio = usuario.municipio;
  this.colonia = usuario.colonia;
  this.direccion = usuario.direccion;
  this.escuela = usuario.escuela;
  this.rol_id = usuario.rol_id;
  this.colegiado = usuario.colegiado;
};

// Crea un nuevo usuario
Usuarios.create = (nuevoUsuario, resultado) => {
  db.query('INSERT INTO usuario SET ?', nuevoUsuario, (err, res) => {
    if (!err) {
      resultado(null, { id: res.insertId, ...nuevoUsuario });
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene todos los usuarios
Usuarios.getAll = (resultado) => {
  db.query('SELECT * FROM usuario', (err, res) => {
    if (!err) {
      resultado(null, res);
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene un usuario por su ID
Usuarios.findById = (id, resultado) => {
  db.query('SELECT * FROM usuario WHERE id = ?', id, (err, res) => {
    if (!err) {
      if (res.length) {
        resultado(null, res[0]);
      } else {
        resultado({ tipo: 'No encontrado' }, null);
      }
    } else {
      resultado(err, null);
    }
  });
};

// Actualiza un usuario por su ID sin borrar datos previos
Usuarios.updateById = (id, newUsuarioData, resultado) => {
  // Primero, obtiene los datos actuales del usuario
  Usuario.findById(id, (err, currentUsuario) => {
    if (err) {
      console.error('Error al obtener el usuario actual:', err);
      return resultado(err, null);
    }

    if (!currentUsuario) {
      return resultado({ tipo: 'No encontrado' }, null);
    }

    // Fusiona los datos actuales con los nuevos datos
    const updatedUsuario = { ...currentUsuario, ...newUsuarioData };

    // Luego, actualiza el usuario en la base de datos
    db.query(
      'UPDATE usuario SET ? WHERE id = ?',
      [updatedUsuario, id],
      (err, res) => {
        if (!err) {
          if (res.affectedRows === 0) {
            resultado({ tipo: 'No encontrado' }, null);
          } else {
            resultado(null, { id, ...updatedUsuario });
          }
        } else {
          resultado(err, null);
        }
      }
    );
  });
};

// Elimina un usuario por su ID
Usuarios.remove = (id, resultado) => {
  db.query('DELETE FROM usuario WHERE id = ?', id, (err, res) => {
    if (!err) {
      if (res.affectedRows === 0) {
        resultado({ tipo: 'No encontrado' }, null);
      } else {
        resultado(null, res);
      }
    } else {
      resultado(err, null);
    }
  });
};

module.exports = Usuarios;
