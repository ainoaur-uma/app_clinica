const db = require('../../server/db_connection');

const Pacientes = function (paciente) {
  this.NHC = paciente.NHC;
  this.carnet_identidad = paciente.carnet_identidad;
  this.nombre = paciente.nombre;
  this.apellido1 = paciente.apellido1;
  this.apellido2 = paciente.apellido2;
  this.fecha_nacimiento = paciente.fecha_nacimiento;
  this.telefono = paciente.telefono;
  this.email = paciente.email;
  this.departamento = paciente.departamento;
  this.municipio = paciente.municipio;
  this.colonia = paciente.colonia;
  this.direccion = paciente.direccion;
  this.tutor_info = paciente.tutor_info;
  this.grado = paciente.grado;
  this.escuela = paciente.escuela;
  this.otra_info = paciente.otra_info;
};

// Crea un nuevo paciente
Pacientes.create = (nuevoPaciente, resultado) => {
  db.query('INSERT INTO paciente SET ?', nuevoPaciente, (err, res) => {
    if (!err) {
      resultado(null, { NHC: res.insertId, ...nuevoPaciente });
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene todos los pacientes
Pacientes.getAll = (resultado) => {
  db.query('SELECT * FROM paciente', (err, res) => {
    if (!err) {
      resultado(null, res);
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene un paciente por su NHC
Pacientes.findByNHC = (NHC, resultado) => {
  db.query('SELECT * FROM paciente WHERE NHC = ?', NHC, (err, res) => {
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

// Actualiza un paciente por su NHC sin borrar datos previos
Pacientes.updateByNHC = (NHC, newPacienteData, resultado) => {
  // Primero, obtiene los datos actuales del paciente
  Pacientes.findByNHC(NHC, (err, currentPaciente) => {
    if (err) {
      console.error('Error al obtener el paciente actual:', err);
      return resultado(err, null);
    }

    if (!currentPaciente) {
      return resultado({ tipo: 'No encontrado' }, null);
    }

    // Fusiona los datos actuales con los nuevos datos
    const updatedPaciente = { ...currentPaciente, ...newPacienteData };

    // Luego, actualiza el paciente en la base de datos
    db.query(
      'UPDATE paciente SET ? WHERE NHC = ?',
      [updatedPaciente, NHC],
      (err, res) => {
        if (!err) {
          if (res.affectedRows === 0) {
            resultado({ tipo: 'No encontrado' }, null);
          } else {
            resultado(null, { NHC, ...updatedPaciente });
          }
        } else {
          resultado(err, null);
        }
      }
    );
  });
};

// Elimina un paciente por su NHC
Pacientes.remove = (NHC, resultado) => {
  db.query('DELETE FROM paciente WHERE NHC = ?', NHC, (err, res) => {
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

module.exports = Pacientes;
