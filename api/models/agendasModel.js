const db = require('../../server/db_connection');

const Agendas = function (agenda) {
  this.id = agenda.id;
  this.descripcion = agenda.descripcion;
  this.horario = agenda.horario;
};

// Crea una nueva agenda
Agendas.create = (nuevaAgenda, resultado) => {
  db.query('INSERT INTO agenda SET ?', nuevaAgenda, (err, res) => {
    if (!err) {
      resultado(null, { id: res.insertId, ...nuevaAgenda });
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene todas las agendas
Agendas.getAll = (resultado) => {
  db.query('SELECT * FROM agenda', (err, res) => {
    if (!err) {
      resultado(null, res);
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene una agenda por su ID
Agendas.findById = (id, resultado) => {
  db.query('SELECT * FROM agenda WHERE id = ?', id, (err, res) => {
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

// Actualiza una agenda por su ID sin borrar datos previos
Agendas.updateById = (id, newAgendaData, resultado) => {
  // Primero, obtiene los datos actuales de la agenda
  Agendas.findById(id, (err, currentAgenda) => {
    if (err) {
      console.error('Error al obtener la agenda actual:', err);
      return resultado(err, null);
    }

    if (!currentAgenda) {
      return resultado({ tipo: 'No encontrado' }, null);
    }

    // Fusiona los datos actuales con los nuevos datos
    const updatedAgenda = { ...currentAgenda, ...newAgendaData };

    // Luego, actualiza la agenda en la base de datos
    db.query(
      'UPDATE agenda SET ? WHERE id = ?',
      [updatedAgenda, id],
      (err, res) => {
        if (!err) {
          if (res.affectedRows === 0) {
            resultado({ tipo: 'No encontrado' }, null);
          } else {
            resultado(null, { id: id, ...updatedAgenda });
          }
        } else {
          resultado(err, null);
        }
      }
    );
  });
};

// Elimina una agenda por su ID
Agendas.remove = (id, resultado) => {
  db.query('DELETE FROM agenda WHERE id = ?', id, (err, res) => {
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

module.exports = Agendas;
