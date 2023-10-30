const db = require('../../server/db_connection');

const InventarioMedicamentos = function (inventarioMedicamento) {
  this.id = inventarioMedicamento.id;
  this.medicamento_id = inventarioMedicamento.medicamento_id;
  this.cantidad_actual = inventarioMedicamento.cantidad_actual;
  this.fecha_registro = inventarioMedicamento.fecha_registro;
};

// Crea un nuevo registro de inventario de medicamento
InventarioMedicamentos.create = (nuevoInventarioMedicamento, resultado) => {
  db.query(
    'INSERT INTO inventario_medicamentos SET ?',
    nuevoInventarioMedicamento,
    (err, res) => {
      if (!err) {
        resultado(null, { id: res.insertId, ...nuevoInventarioMedicamento });
      } else {
        resultado(err, null);
      }
    }
  );
};

// Obtiene todos los registros de inventario de medicamentos
InventarioMedicamentos.getAll = (resultado) => {
  db.query('SELECT * FROM inventario_medicamentos', (err, res) => {
    if (!err) {
      resultado(null, res);
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene un registro de inventario de medicamento por su ID
InventarioMedicamentos.findById = (id, resultado) => {
  db.query(
    'SELECT * FROM inventario_medicamentos WHERE id = ?',
    id,
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

// Actualiza un registro de inventario de medicamento por su ID sin borrar datos previos
InventarioMedicamentos.updateById = (
  id,
  newInventarioMedicamentoData,
  resultado
) => {
  // Primero, obtiene los datos actuales del registro de inventario de medicamento
  InventarioMedicamentos.findById(id, (err, currentInventarioMedicamento) => {
    if (err) {
      console.error('Error al obtener el registro de inventario actual:', err);
      return resultado(err, null);
    }

    if (!currentInventarioMedicamento) {
      return resultado({ tipo: 'No encontrado' }, null);
    }

    // Fusiona los datos actuales con los nuevos datos
    const updatedInventarioMedicamento = {
      ...currentInventarioMedicamento,
      ...newInventarioMedicamentoData,
    };

    // Luego, actualiza el registro de inventario de medicamento en la base de datos
    db.query(
      'UPDATE inventario_medicamentos SET ? WHERE id = ?',
      [updatedInventarioMedicamento, id],
      (err, res) => {
        if (!err) {
          if (res.affectedRows === 0) {
            resultado({ tipo: 'No encontrado' }, null);
          } else {
            resultado(null, { id: id, ...updatedInventarioMedicamento });
          }
        } else {
          resultado(err, null);
        }
      }
    );
  });
};

// Elimina un registro de inventario de medicamento por su ID
InventarioMedicamentos.remove = (id, resultado) => {
  db.query(
    'DELETE FROM inventario_medicamentos WHERE id = ?',
    id,
    (err, res) => {
      if (!err) {
        if (res.affectedRows === 0) {
          resultado({ tipo: 'No encontrado' }, null);
        } else {
          resultado(null, res);
        }
      } else {
        resultado(err, null);
      }
    }
  );
};

module.exports = InventarioMedicamentos;
