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

// Actualiza una cita por su ID sin borrar datos previos
Citas.updateById = (id, newCitaData, resultado) => {
  // Primero, obtiene los datos actuales de la cita
  Citas.findById(id, (err, currentCita) => {
    if (err) {
      console.error('Error al obtener la cita actual:', err);
      return resultado(err, null);
    }

    if (!currentCita) {
      return resultado({ tipo: 'No encontrado' }, null);
    }

    // Fusiona los datos actuales con los nuevos datos
    const updatedCita = { ...currentCita, ...newCitaData };

    // Luego, actualiza la cita en la base de datos
    db.query(
      'UPDATE cita SET ? WHERE id = ?',
      [updatedCita, id],
      (err, res) => {
        if (!err) {
          if (res.affectedRows === 0) {
            resultado({ tipo: 'No encontrado' }, null);
          } else {
            resultado(null, { id: id, ...updatedCita });
          }
        } else {
          resultado(err, null);
        }
      }
    );
  });
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
