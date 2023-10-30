const db = require('../../server/db_connection');

const Episodios = function (episodio) {
  this.id = episodio.id;
  this.NHC = episodio.NHC;
  this.fecha_episodio = episodio.fecha_episodio;
  this.tipo_asistencia = episodio.tipo_asistencia;
  this.motivo_consulta = episodio.motivo_consulta;
  this.anamnesis = episodio.anamnesis;
  this.diagnostico = episodio.diagnostico;
  this.tratamiento = episodio.tratamiento;
};

// Crea un nuevo episodio
Episodios.create = (nuevoEpisodio, resultado) => {
  db.query('INSERT INTO episodio SET ?', nuevoEpisodio, (err, res) => {
    if (!err) {
      resultado(null, { id: res.insertId, ...nuevoEpisodio });
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene todos los episodios
Episodios.getAll = (resultado) => {
  db.query('SELECT * FROM episodio', (err, res) => {
    if (!err) {
      resultado(null, res);
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene un episodio por su ID
Episodios.findById = (id, resultado) => {
  db.query('SELECT * FROM episodio WHERE id = ?', id, (err, res) => {
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

// Actualiza un episodio por su ID sin borrar datos previos
Episodios.updateById = (id, newEpisodioData, resultado) => {
  // Primero, obtiene los datos actuales del episodio
  Episodios.findById(id, (err, currentEpisodio) => {
    if (err) {
      console.error('Error al obtener el episodio actual:', err);
      return resultado(err, null);
    }

    if (!currentEpisodio) {
      return resultado({ tipo: 'No encontrado' }, null);
    }

    // Fusiona los datos actuales con los nuevos datos
    const updatedEpisodio = { ...currentEpisodio, ...newEpisodioData };

    // Luego, actualiza el episodio en la base de datos
    db.query(
      'UPDATE episodio SET ? WHERE id = ?',
      [updatedEpisodio, id],
      (err, res) => {
        if (!err) {
          if (res.affectedRows === 0) {
            resultado({ tipo: 'No encontrado' }, null);
          } else {
            resultado(null, { id: id, ...updatedEpisodio });
          }
        } else {
          resultado(err, null);
        }
      }
    );
  });
};

// Elimina un episodio por su ID
Episodios.remove = (id, resultado) => {
  db.query('DELETE FROM episodio WHERE id = ?', id, (err, res) => {
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

module.exports = Episodios;
