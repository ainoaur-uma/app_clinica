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

// Obtiene un paciente por su nombre
Pacientes.findByNombre = (nombre, resultado) => {
  db.query('SELECT * FROM paciente WHERE nombre = ?', nombre, (err, res) => {
    if (!err) {
      if (res.length) {
        resultado(null, res);
      } else {
        resultado({ tipo: 'No encontrado' }, null);
      }
    } else {
      resultado(err, null);
    }
  });
};

// Obtiene pacientes por apellido (buscando en ambas columnas "apellido1" y "apellido2")
Pacientes.findByApellido = (apellido, resultado) => {
  db.query(
    'SELECT * FROM paciente WHERE apellido1 = ? OR apellido2 = ?',
    [apellido, apellido],
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

// Actualiza un paciente por su NHC
Pacientes.updateByNHC = (NHC, paciente, resultado) => {
  db.query(
    'UPDATE paciente SET carnet_identidad = ?, nombre = ?, apellido1 = ?, apellido2 = ?, fecha_nacimiento = ?, telefono = ?, email = ?, departamento = ?, municipio = ?, colonia = ?, direccion = ?, tutor_info = ?, grado = ?, escuela = ?, otra_info = ? WHERE NHC = ?',
    [
      paciente.carnet_identidad,
      paciente.nombre,
      paciente.apellido1,
      paciente.apellido2,
      paciente.fecha_nacimiento,
      paciente.telefono,
      paciente.email,
      paciente.departamento,
      paciente.municipio,
      paciente.colonia,
      paciente.direccion,
      paciente.tutor_info,
      paciente.grado,
      paciente.escuela,
      paciente.otra_info,
      NHC,
    ],
    (err, res) => {
      if (!err) {
        if (res.affectedRows === 0) {
          resultado({ tipo: 'No encontrado' }, null);
        } else {
          resultado(null, { NHC: NHC, ...paciente });
        }
      } else {
        resultado(err, null);
      }
    }
  );
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
