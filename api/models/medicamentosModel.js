const db = require('../../server/db_connection');

const Medicamentos = function (medicamento) {
  this.nombre_medicamento = medicamento.nombre_medicamento;
  this.principio_activo = medicamento.principio_activo;
  this.descripcion_medicamento = medicamento.descripcion_medicamento;
  this.fecha_caducidad = medicamento.fecha_caducidad;
  this.forma_dispensacion = medicamento.forma_dispensacion;
};

// Crea un nuevo medicamento
Medicamentos.create = (nuevoMedicamento, resultado) => {
  db.query('INSERT INTO medicamento SET ?', nuevoMedicamento, (err, res) => {
    if (!err) {
      resultado(null, { id: res.insertId, ...nuevoMedicamento });
    } else {
      resultado(err, null);
    }
  });
};

//Obtiene todos lo medicamentos
Medicamentos.getAll = (resultado) => {
  db.query('SELECT * FROM medicamento', (err, res) => {
    if (!err) {
      resultado(null, res);
    } else {
      resultado(err, null);
    }
  });
};

//Obtiene un medicamento por su ID
Medicamentos.findById = (medicamentoId, resultado) => {
  db.query(
    'SELECT * FROM medicamento WHERE id = ?',
    medicamentoId,
    (err, res) => {
      if (!err) {
        if (res.length) {
          resultado(null, res[0]);
        } else {
          resultado({ tipo: 'No encontrado' }, null);
        }
      } else {
        resultado(err, null);
      }
    }
  );
};

// Obtiene un medicamento por su nombre
Medicamentos.findByNombre = (nombre, resultado) => {
  db.query(
    'SELECT * FROM medicamento WHERE nombre_medicamento = ?',
    nombre,
    (err, res) => {
      if (!err) {
        if (res.length) {
          resultado(null, res);
        } else {
          resultado({ tipo: 'No encontrado' }, null);
        }
      } else {
        resultado(err, null);
      }
    }
  );
};

// Obtiene un medicamento por su principio activo
Medicamentos.findByPrincipioActivo = (principioActivo, resultado) => {
  db.query(
    'SELECT * FROM medicamento WHERE principio_activo = ?',
    principioActivo,
    (err, res) => {
      if (!err) {
        if (res.length) {
          resultado(null, res);
        } else {
          resultado({ tipo: 'No encontrado' }, null);
        }
      } else {
        resultado(err, null);
      }
    }
  );
};

//Actualiza un medicamento por su ID
Medicamentos.updateById = (id, medicamento, resultado) => {
  db.query(
    'UPDATE medicamento SET nombre_medicamento = ?, principio_activo = ?, descripcion_medicamento = ?, fecha_caducidad = ?, forma_dispensacion = ? WHERE id = ?',
    [
      medicamento.nombre_medicamento,
      medicamento.principio_activo,
      medicamento.descripcion_medicamento,
      medicamento.fecha_caducidad,
      medicamento.forma_dispensacion,
      id,
    ],
    (err, res) => {
      if (!err) {
        if (res.affectedRows === 0) {
          resultado({ tipo: 'No encontrado' }, null);
        } else {
          resultado(null, { id: id, ...medicamento });
        }
      } else {
        resultado(err, null);
      }
    }
  );
};

//Elimina un medicamento por su ID
Medicamentos.remove = (id, resultado) => {
  db.query('DELETE FROM medicamento WHERE id = ?', id, (err, res) => {
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

module.exports = Medicamentos;
