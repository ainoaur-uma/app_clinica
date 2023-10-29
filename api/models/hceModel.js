const db = require('../../server/db_connection');

const HCE = function (hce) {
  this.NHC = hce.NHC;
  this.sexo = hce.sexo;
  this.grupo_sanguineo = hce.grupo_sanguineo;
  this.alergias = hce.alergias;
  this.antecedentes_clinicos = hce.antecedentes_clinicos;
  this.peso = hce.peso;
  this.talla = hce.talla;
  this.IMC = hce.IMC;
  this.pulso = hce.pulso;
  this.SPO2 = hce.SPO2;
};

// Crea una nueva Historia Clínica Electrónica (HCE)
HCE.create = (nuevaHCE, resultado) => {
  db.query('INSERT INTO hce SET ?', nuevaHCE, (err, res) => {
    if (!err) {
      resultado(null, { NHC: res.insertId, ...nuevaHCE });
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene todas las Historias Clínicas Electrónicas (HCE)
HCE.getAll = (resultado) => {
  db.query('SELECT * FROM hce', (err, res) => {
    if (!err) {
      resultado(null, res);
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene una Historia Clínica Electrónica (HCE) por el NHC del paciente
HCE.findByNHC = (NHC, resultado) => {
  db.query('SELECT * FROM hce WHERE NHC = ?', NHC, (err, res) => {
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

// Actualiza una Historia Clínica Electrónica (HCE) por el NHC del paciente
HCE.updateByNHC = (NHC, newHCEData, resultado) => {
  // Primero, obtiene los datos actuales de la HCE
  HCE.findByNHC(NHC, (err, currentHCE) => {
    if (err) {
      console.error('Error al obtener la HCE actual:', err);
      return resultado(err, null);
    }

    if (!currentHCE) {
      return resultado({ tipo: 'No encontrado' }, null);
    }

    // Fusiona los datos actuales con los nuevos datos
    const updatedHCE = { ...currentHCE, ...newHCEData };

    // Luego, actualiza la HCE en la base de datos
    db.query(
      'UPDATE hce SET ? WHERE NHC = ?',
      [updatedHCE, NHC],
      (err, res) => {
        if (!err) {
          if (res.affectedRows === 0) {
            resultado({ tipo: 'No encontrado' }, null);
          } else {
            resultado(null, { NHC: NHC, ...updatedHCE });
          }
        } else {
          resultado(err, null);
        }
      }
    );
  });
};

// Elimina una Historia Clínica Electrónica (HCE) por el NHC del paciente
HCE.remove = (NHC, resultado) => {
  db.query('DELETE FROM hce WHERE NHC = ?', NHC, (err, res) => {
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

module.exports = HCE;
