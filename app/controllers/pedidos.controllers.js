const db = require('../config/db.config.js');
const Pedido = db.Pedido;

// Crear un nuevo pedido
exports.create = (req, res) => {
  let pedido = {
    ID_HABITACION: req.body.ID_HABITACION,
    ID_RESTAURANTE: req.body.ID_RESTAURANTE,
    TIPO_PEDIDO: req.body.TIPO_PEDIDO,
    ESTADO: req.body.ESTADO,
    FECHA_HORA: req.body.FECHA_HORA,
    DESCRIPCION: req.body.DESCRIPCION,
    TOTAL: req.body.TOTAL
  };

  Pedido.create(pedido)
    .then(result => {
      res.status(200).json({
        message: "Pedido creado con éxito con id = " + result.ID_PEDIDO,
        pedido: result,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Falló!",
        error: error.message
      });
    });
};

// Obtener todos los pedidos
exports.retrieveAllPedidos = (req, res) => {
  Pedido.findAll()
    .then(pedidoInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todos los pedidos con éxito!",
        pedidos: pedidoInfos
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
};

// Obtener pedido por ID
exports.getPedidoById = (req, res) => {
  let pedidoId = req.params.id;
  Pedido.findByPk(pedidoId)
    .then(pedido => {
      if (pedido) {
        res.status(200).json({
          message: "Se obtuvo con éxito el pedido con id = " + pedidoId,
          pedido: pedido
        });
      } else {
        res.status(404).json({
          message: "No se encontró el pedido con id = " + pedidoId,
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

// Actualizar pedido por ID
exports.updateById = async (req, res) => {
  try {
    let pedidoId = req.params.id;
    let pedido = await Pedido.findByPk(pedidoId);

    if (!pedido) {
      res.status(404).json({
        message: "No se encontró el pedido para actualizar con id = " + pedidoId,
        pedido: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        ID_HABITACION: req.body.ID_HABITACION,
        ID_RESTAURANTE: req.body.ID_RESTAURANTE,
        TIPO_PEDIDO: req.body.TIPO_PEDIDO,
        ESTADO: req.body.ESTADO,
        FECHA_HORA: req.body.FECHA_HORA,
        DESCRIPCION: req.body.DESCRIPCION,
        TOTAL: req.body.TOTAL
      };
      let result = await Pedido.update(updatedObject, { returning: true, where: { ID_PEDIDO: pedidoId } });

      if (!result[0]) {
        res.status(500).json({
          message: "Error -> No se puede actualizar el pedido con id = " + pedidoId,
          error: "No se pudo actualizar",
        });
      }

      res.status(200).json({
        message: "Actualización exitosa del pedido con id = " + pedidoId,
        pedido: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el pedido con id = " + req.params.id,
      error: error.message
    });
  }
};

// Eliminar pedido por ID
exports.deleteById = async (req, res) => {
  try {
    let pedidoId = req.params.id;
    let pedido = await Pedido.findByPk(pedidoId);

    if (!pedido) {
      res.status(404).json({
        message: "No existe un pedido con id = " + pedidoId,
        error: "404",
      });
    } else {
      await pedido.destroy();
      res.status(200).json({
        message: "Eliminación exitosa del pedido con id = " + pedidoId,
        pedido: pedido,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el pedido con id = " + req.params.id,
      error: error.message,
    });
  }
};
