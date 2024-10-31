const db = require('../config/db.config.js');
const DetalleFacturacion = db.DetalleFacturacion; // Asegúrate de que DetalleFacturacion esté correctamente exportado en db.config.js

// Crear un nuevo detalle de facturación
exports.create = (req, res) => {
  let detalle = {
    ID_FACTURA: req.body.ID_FACTURA,
    DESCRIPCION: req.body.DESCRIPCION,
    CANTIDAD: req.body.CANTIDAD,
    PRECIO_UNITARIO: req.body.PRECIO_UNITARIO,
    SUBTOTAL: req.body.SUBTOTAL,
    TOTAL_ITEM: req.body.TOTAL_ITEM
  };

  DetalleFacturacion.create(detalle)
    .then(result => {
      res.status(200).json({
        message: "Detalle de facturación creado con éxito con id = " + result.ID_DETALLE,
        detalle: result,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Falló!",
        error: error.message
      });
    });
};

// Obtener todos los detalles de facturación
exports.retrieveAllDetalles = (req, res) => {
  DetalleFacturacion.findAll()
    .then(detalleInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todos los detalles de facturación con éxito!",
        detalles: detalleInfos
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
};

// Obtener detalle de facturación por ID
exports.getDetalleById = (req, res) => {
  let detalleId = req.params.id;
  DetalleFacturacion.findByPk(detalleId)
    .then(detalle => {
      if (detalle) {
        res.status(200).json({
          message: "Se obtuvo con éxito el detalle de facturación con id = " + detalleId,
          detalle: detalle
        });
      } else {
        res.status(404).json({
          message: "No se encontró el detalle de facturación con id = " + detalleId,
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

// Actualizar detalle de facturación por ID
exports.updateById = async (req, res) => {
  try {
    let detalleId = req.params.id;
    let detalle = await DetalleFacturacion.findByPk(detalleId);

    if (!detalle) {
      res.status(404).json({
        message: "No se encontró el detalle de facturación para actualizar con id = " + detalleId,
        detalle: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        ID_FACTURA: req.body.ID_FACTURA,
        DESCRIPCION: req.body.DESCRIPCION,
        CANTIDAD: req.body.CANTIDAD,
        PRECIO_UNITARIO: req.body.PRECIO_UNITARIO,
        SUBTOTAL: req.body.SUBTOTAL,
        TOTAL_ITEM: req.body.TOTAL_ITEM
      };
      let result = await DetalleFacturacion.update(updatedObject, { returning: true, where: { ID_DETALLE: detalleId } });

      if (!result[0]) {
        res.status(500).json({
          message: "Error -> No se puede actualizar el detalle de facturación con id = " + detalleId,
          error: "No se pudo actualizar",
        });
      }

      res.status(200).json({
        message: "Actualización exitosa del detalle de facturación con id = " + detalleId,
        detalle: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el detalle de facturación con id = " + req.params.id,
      error: error.message
    });
  }
};

// Eliminar detalle de facturación por ID
exports.deleteById = async (req, res) => {
  try {
    let detalleId = req.params.id;
    let detalle = await DetalleFacturacion.findByPk(detalleId);

    if (!detalle) {
      res.status(404).json({
        message: "No existe un detalle de facturación con id = " + detalleId,
        error: "404",
      });
    } else {
      await detalle.destroy();
      res.status(200).json({
        message: "Eliminación exitosa del detalle de facturación con id = " + detalleId,
        detalle: detalle,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el detalle de facturación con id = " + req.params.id,
      error: error.message,
    });
  }
};
