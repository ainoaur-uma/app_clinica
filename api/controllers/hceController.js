// Importa el modelo
const HCE = require('../models/hceModel');

// Crea una nueva Historia Clínica Electrónica (HCE): inserta una nueva HCE en la base de datos
exports.create = (req, res) => {
  // Obtiene los datos de la nueva HCE desde la solicitud (req.body)
  const nuevaHCE = {
    NHC: req.body.NHC,
    sexo: req.body.sexo,
    grupo_sanguineo: req.body.grupo_sanguineo,
    alergias: req.body.alergias,
    antecedentes_clinicos: req.body.antecedentes_clinicos,
    peso: req.body.peso,
    talla: req.body.talla,
    IMC: req.body.IMC,
    pulso: req.body.pulso,
    SPO2: req.body.SPO2,
  };

  // Lógica para insertar la nueva HCE en la base de datos
  HCE.create(nuevaHCE, (err, hce) => {
    if (err) {
      console.error(
        'Error al crear la Historia Clínica Electrónica (HCE):',
        err
      );
      return res.status(500).json({
        mensaje: 'Error al crear la Historia Clínica Electrónica (HCE)',
        error: err,
      });
    }
    return res.status(201).json(hce);
  });
};

// Obtiene todas las Historias Clínicas Electrónicas (HCE)
exports.findAll = (req, res) => {
  HCE.getAll((err, hces) => {
    if (err) {
      console.error(
        'Error al obtener las Historias Clínicas Electrónicas (HCE):',
        err
      );
      return res.status(500).json({
        mensaje: 'Error al obtener las Historias Clínicas Electrónicas (HCE)',
        error: err,
      });
    }
    return res.status(200).json(hces);
  });
};

// Obtiene una Historia Clínica Electrónica (HCE) por el NHC del paciente
exports.findOne = (req, res) => {
  const NHC = req.params.NHC; // Obtiene el NHC del paciente desde los parámetros de la URL
  HCE.findByNHC(NHC, (err, hce) => {
    if (err) {
      console.error(
        'Error al obtener la Historia Clínica Electrónica (HCE) por su NHC:',
        err
      );
      return res.status(500).json({
        mensaje:
          'Error al obtener la Historia Clínica Electrónica (HCE) por su NHC',
        error: err,
      });
    }
    if (!hce) {
      return res
        .status(404)
        .json({ mensaje: 'Historia Clínica Electrónica (HCE) no encontrada' });
    }
    return res.status(200).json(hce);
  });
};

// // Actualiza una Historia Clínica Electrónica (HCE) por el NHC del paciente
// exports.update = (req, res) => {
//   const NHC = req.params.NHC;
//   const updatedData = {
//     sexo: req.body.sexo,
//     grupo_sanguineo: req.body.grupo_sanguineo,
//     alergias: req.body.alergias,
//     antecedentes_clinicos: req.body.antecedentes_clinicos,
//     peso: req.body.peso,
//     talla: req.body.talla,
//     IMC: req.body.IMC,
//     pulso: req.body.pulso,
//     SPO2: req.body.SPO2,
//   };
//   // Lógica para actualizar la Historia Clínica Electrónica (HCE)
//   HCE.updateByNHC(NHC, updatedData, (err, result) => {
//     if (err) {
//       console.error(
//         'Error al actualizar la Historia Clínica Electrónica (HCE) por su NHC:',
//         err
//       );
//       return res.status(500).json({
//         mensaje:
//           'Error al actualizar la Historia Clínica Electrónica (HCE) por su NHC',
//         error: err,
//       });
//     }

//     if (result.affectedRows === 0) {
//       return res
//         .status(404)
//         .json({ mensaje: 'Historia Clínica Electrónica (HCE) no encontrada' });
//     }

//     return res.status(200).json({
//       mensaje:
//         'Historia Clínica Electrónica (HCE) VERSION1 actualizada exitosamente',
//     });
//   });
// };

// Actualiza una Historia Clínica Electrónica (HCE) por el NHC del paciente sin borrar los datos previos
exports.updateByNHC = (req, res) => {
  const NHC = req.params.NHC;
  const updatedData = req.body; // Usa todo el cuerpo de la solicitud para la actualización

  // Lógica para actualizar la Historia Clínica Electrónica (HCE) por NHC sin borrar datos previos
  HCE.updateByNHC(NHC, updatedData, (err, result) => {
    if (err) {
      console.error(
        'Error al actualizar la Historia Clínica Electrónica (HCE) por su NHC:',
        err
      );
      return res.status(500).json({
        mensaje:
          'Error al actualizar la Historia Clínica Electrónica (HCE) por su NHC',
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ mensaje: 'Historia Clínica Electrónica (HCE) no encontrada' });
    }

    return res.status(200).json({
      mensaje:
        'Historia Clínica Electrónica (HCE) VERSION2 actualizada exitosamente',
    });
  });
};

// Elimina una Historia Clínica Electrónica (HCE) por el NHC del paciente
exports.delete = (req, res) => {
  const NHC = req.params.NHC;

  HCE.remove(NHC, (err, result) => {
    if (err) {
      console.error(
        'Error al eliminar la Historia Clínica Electrónica (HCE) por su NHC:',
        err
      );
      return res.status(500).json({
        mensaje:
          'Error al eliminar la Historia Clínica Electrónica (HCE) por su NHC',
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ mensaje: 'Historia Clínica Electrónica (HCE) no encontrada' });
    }

    return res.status(200).json({
      mensaje: 'Historia Clínica Electrónica (HCE) eliminada exitosamente',
    });
  });
};

// Exportamos las funciones del controlador
module.exports = {
  create: exports.create,
  findAll: exports.findAll,
  findOne: exports.findOne,
  update: exports.update,
  delete: exports.delete,
  updateByNHC: exports.updateByNHC,
};
