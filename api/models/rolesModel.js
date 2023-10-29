// Importa la conexión a la base de datos
const db = require('../../server/db_connection');

// Define el modelo para la entidad de roles
const Roles = function (rol) {
  this.nombre = rol.nombre;
  this.descripcion = rol.descripcion;
};

// Crea un nuevo rol
Roles.create = (nuevoRol, resultado) => {
  db.query('INSERT INTO Rol SET ?', nuevoRol, (err, res) => {
    if (!err) {
      resultado(null, { id: res.insertId, ...nuevoRol });
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene todos los roles
Roles.getAll = (resultado) => {
  db.query('SELECT * FROM Rol', (err, res) => {
    if (!err) {
      resultado(null, res);
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene un rol por su ID
Roles.findById = (rolId, resultado) => {
  db.query('SELECT * FROM Rol WHERE id = ?', rolId, (err, res) => {
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

// Actualiza un rol por su ID
Roles.updateById = (id, rol, resultado) => {
  db.query(
    'UPDATE Rol SET nombre = ? WHERE id = ?',
    [rol.nombre, id],
    (err, res) => {
      if (!err) {
        if (res.affectedRows === 0) {
          resultado({ tipo: 'No encontrado' }, null);
        } else {
          resultado(null, { id: id, ...rol });
        }
      } else {
        resultado(err, null);
      }
    }
  );
};

// Elimina un rol por su ID
Roles.remove = (id, resultado) => {
  db.query('DELETE FROM Rol WHERE id = ?', id, (err, res) => {
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

module.exports = Roles;
