const db = require('../config/db.config.js');
const Pago = db.Pago; // Asegúrate de que Pago esté correctamente exportado en db.config.js

// Crear un nuevo pago
exports.create = (req, res) => {
  let pago = {
    ID_FACTURA: req.body.ID_FACTURA,
    FECHA_PAGO: req.body.FECHA_PAGO,
    MONTO: req.body.MONTO,
    METODO_PAGO: req.body.METODO_PAGO,
    ESTADO: req.body.ESTADO,
    COMENTARIO: req.body.COMENTARIO
  };

  Pago.create(pago)
    .then(result => {
      res.status(200).json({
        message: "Pago creado con éxito con id = " + result.ID_PAGO,
        pago: result,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Falló!",
        error: error.message
      });
    });
};

// Obtener todos los pagos
exports.retrieveAllPagos = (req, res) => {
  Pago.findAll()
    .then(pagoInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todos los pagos con éxito!",
        pagos: pagoInfos
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
};

// Obtener pago por ID
exports.getPagoById = (req, res) => {
  let pagoId = req.params.id;
  Pago.findByPk(pagoId)
    .then(pago => {
      if (pago) {
        res.status(200).json({
          message: "Se obtuvo con éxito el pago con id = " + pagoId,
          pago: pago
        });
      } else {
        res.status(404).json({
          message: "No se encontró el pago con id = " + pagoId,
          error: "404"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
};

// Actualizar pago por ID
exports.updateById = async (req, res) => {
  try {
    let pagoId = req.params.id;
    let pago = await Pago.findByPk(pagoId);

    if (!pago) {
      res.status(404).json({
        message: "No se encontró el pago para actualizar con id = " + pagoId,
        pago: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        ID_FACTURA: req.body.ID_FACTURA,
        FECHA_PAGO: req.body.FECHA_PAGO,
        MONTO: req.body.MONTO,
        METODO_PAGO: req.body.METODO_PAGO,
        ESTADO: req.body.ESTADO,
        COMENTARIO: req.body.COMENTARIO
      };
      let result = await Pago.update(updatedObject, { returning: true, where: { ID_PAGO: pagoId } });

      if (!result[0]) {
        res.status(500).json({
          message: "Error -> No se puede actualizar el pago con id = " + pagoId,
          error: "No se pudo actualizar",
        });
      }

      res.status(200).json({
        message: "Actualización exitosa del pago con id = " + pagoId,
        pago: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el pago con id = " + req.params.id,
      error: error.message
    });
  }
};

// Eliminar pago por ID
exports.deleteById = async (req, res) => {
  try {
    let pagoId = req.params.id;
    let pago = await Pago.findByPk(pagoId);

    if (!pago) {
      res.status(404).json({
        message: "No existe un pago con id = " + pagoId,
        error: "404",
      });
    } else {
      await pago.destroy();
      res.status(200).json({
        message: "Eliminación exitosa del pago con id = " + pagoId,
        pago: pago,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el pago con id = " + req.params.id,
      error: error.message,
    });
  }
};
