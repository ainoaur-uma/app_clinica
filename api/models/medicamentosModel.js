const db = require('../../server/db_connection');

const Medicamentos = function (medicamento) {
  this.id = medicamento.id;
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

// Obtiene todos los medicamentos
Medicamentos.getAll = (resultado) => {
  db.query('SELECT * FROM medicamento', (err, res) => {
    if (!err) {
      resultado(null, res);
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene un medicamento por su ID
Medicamentos.findById = (id, resultado) => {
  db.query('SELECT * FROM medicamento WHERE id = ?', id, (err, res) => {
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

// Actualiza un medicamento por su ID sin borrar datos previos
Medicamentos.updateById = (id, newMedicamentoData, resultado) => {
  // Primero, obtiene los datos actuales del medicamento
  Medicamentos.findById(id, (err, currentMedicamento) => {
    if (err) {
      console.error('Error al obtener el medicamento actual:', err);
      return resultado(err, null);
    }

    if (!currentMedicamento) {
      return resultado({ tipo: 'No encontrado' }, null);
    }

    // Fusiona los datos actuales con los nuevos datos
    const updatedMedicamento = { ...currentMedicamento, ...newMedicamentoData };

    // Luego, actualiza el medicamento en la base de datos
    db.query(
      'UPDATE medicamento SET ? WHERE id = ?',
      [updatedMedicamento, id],
      (err, res) => {
        if (!err) {
          if (res.affectedRows === 0) {
            resultado({ tipo: 'No encontrado' }, null);
          } else {
            resultado(null, { id: id, ...updatedMedicamento });
          }
        } else {
          resultado(err, null);
        }
      }
    );
  });
};

// Elimina un medicamento por su ID
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
