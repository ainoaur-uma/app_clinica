// Importar el modelo
const InventarioMedicamentos = require('../models/inventarioMedicamentosModel');

// Crea un nuevo registro de inventario de medicamento: inserta un nuevo registro en la bd
exports.create = (req, res) => {
  // Obtiene los datos del nuevo registro desde la solicitud (req.body)
  const nuevoInventarioMedicamento = {
    medicamento_id: req.body.medicamento_id,
    cantidad_actual: req.body.cantidad_actual,
    fecha_registro: req.body.fecha_registro,
  };

  // Lógica para insertar el nuevo registro de inventario en la base de datos
  InventarioMedicamentos.create(
    nuevoInventarioMedicamento,
    (err, inventarioMedicamento) => {
      if (err) {
        console.error(
          'Error al crear el registro de inventario de medicamento:',
          err
        );
        return res
          .status(500)
          .json({
            mensaje: 'Error al crear el registro de inventario de medicamento',
            error: err,
          });
      }
      return res.status(201).json(inventarioMedicamento);
    }
  );
};

// Obtiene todos los registros de inventario de medicamentos de la bd
exports.findAll = (req, res) => {
  InventarioMedicamentos.getAll((err, inventarioMedicamentos) => {
    if (err) {
      console.error(
        'Error al obtener los registros de inventario de medicamentos:',
        err
      );
      return res
        .status(500)
        .json({
          mensaje:
            'Error al obtener los registros de inventario de medicamentos',
          error: err,
        });
    }
    return res.status(200).json(inventarioMedicamentos);
  });
};

// Obtiene un registro de inventario de medicamento por su ID
exports.findOne = (req, res) => {
  const inventarioMedicamentoId = req.params.inventarioMedicamentoId; // Obtiene el ID del registro desde los parámetros de la URL
  InventarioMedicamentos.findById(
    inventarioMedicamentoId,
    (err, inventarioMedicamento) => {
      if (err) {
        console.error(
          'Error al obtener el registro de inventario de medicamento por su ID:',
          err
        );
        return res.status(500).json({
          mensaje:
            'Error al obtener el registro de inventario de medicamento por su ID',
          error: err,
        });
      }
      if (!inventarioMedicamento) {
        return res
          .status(404)
          .json({
            mensaje: 'Registro de inventario de medicamento no encontrado',
          });
      }
      return res.status(200).json(inventarioMedicamento);
    }
  );
};

// Actualiza un registro de inventario de medicamento por su ID
exports.update = (req, res) => {
  const inventarioMedicamentoId = req.params.inventarioMedicamentoId;

  // Lógica para obtener el registro de inventario de medicamento actual
  InventarioMedicamentos.findById(
    inventarioMedicamentoId,
    (err, currentInventarioMedicamento) => {
      if (err) {
        console.error(
          'Error al obtener el registro de inventario de medicamento actual:',
          err
        );
        return res.status(500).json({
          mensaje:
            'Error al obtener el registro de inventario de medicamento actual',
          error: err,
        });
      }

      if (!currentInventarioMedicamento) {
        return res
          .status(404)
          .json({
            mensaje: 'Registro de inventario de medicamento no encontrado',
          });
      }

      const updatedData = req.body;

      // Actualiza todo el registro de inventario de medicamento según los datos proporcionados en la solicitud
      const updatedInventarioMedicamento = {
        ...currentInventarioMedicamento,
        ...updatedData,
      };

      // Luego, actualiza el registro de inventario de medicamento en la base de datos
      InventarioMedicamentos.updateById(
        inventarioMedicamentoId,
        updatedInventarioMedicamento,
        (err, result) => {
          if (err) {
            console.error(
              'Error al actualizar el registro de inventario de medicamento por su ID:',
              err
            );
            return res.status(500).json({
              mensaje:
                'Error al actualizar el registro de inventario de medicamento por su ID',
              error: err,
            });
          }

          if (result.affectedRows === 0) {
            return res
              .status(404)
              .json({
                mensaje: 'Registro de inventario de medicamento no encontrado',
              });
          }

          return res
            .status(200)
            .json({
              mensaje:
                'Registro de inventario de medicamento actualizado exitosamente',
            });
        }
      );
    }
  );
};

// Elimina un registro de inventario de medicamento por su ID
exports.delete = (req, res) => {
  const inventarioMedicamentoId = req.params.inventarioMedicamentoId;

  InventarioMedicamentos.remove(inventarioMedicamentoId, (err, result) => {
    if (err) {
      console.error(
        'Error al eliminar el registro de inventario de medicamento por su ID:',
        err
      );
      return res.status(500).json({
        mensaje:
          'Error al eliminar el registro de inventario de medicamento por su ID',
        error: err,
      });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({
          mensaje: 'Registro de inventario de medicamento no encontrado',
        });
    }

    return res
      .status(200)
      .json({
        mensaje: 'Registro de inventario de medicamento eliminado exitosamente',
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
};
