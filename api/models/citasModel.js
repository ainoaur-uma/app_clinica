// Importa la conexión a la base de datos
const db = require('../../server/db_connection');

// Define el modelo para la entidad de citas
const Citas = function (cita) {
  this.fecha = cita.fecha;
  this.hora = cita.hora;
  this.NHC = cita.NHC;
  this.doctor_id = cita.doctor_id;
  this.agenda_id = cita.agenda_id;
  this.informacion_cita = cita.informacion_cita;
};

// Crea una nueva cita
Citas.create = (nuevaCita, resultado) => {
  db.query('INSERT INTO cita SET ?', nuevaCita, (err, res) => {
    if (!err) {
      resultado(null, { id: res.insertId, ...nuevaCita });
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene todas las citas
Citas.getAll = (resultado) => {
  db.query('SELECT * FROM cita', (err, res) => {
    if (!err) {
      resultado(null, res);
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene una cita por su ID
Citas.findById = (citaId, resultado) => {
  db.query('SELECT * FROM cita WHERE id = ?', citaId, (err, res) => {
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

// Actualiza una cita por su ID
Citas.updateById = (id, cita, resultado) => {
  db.query(
    'UPDATE cita SET fecha = ?, hora = ?, NHC = ?, doctor_id = ?, agenda_id = ?, informacion_cita = ? WHERE id = ?',
    [
      cita.fecha,
      cita.hora,
      cita.NHC,
      cita.doctor_id,
      cita.agenda_id,
      cita.informacion_cita,
      id,
    ],
    (err, res) => {
      if (!err) {
        if (res.affectedRows === 0) {
          resultado({ tipo: 'No encontrado' }, null);
        } else {
          resultado(null, { id: id, ...cita });
        }
      } else {
        resultado(err, null);
      }
    }
  );
};

// Elimina una cita por su ID
Citas.remove = (id, resultado) => {
  db.query('DELETE FROM cita WHERE id = ?', id, (err, res) => {
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

module.exports = Citas;
