const db = require('../config/db.config.js');
const Cliente = db.Cliente; // Asegúrate de que Cliente esté correctamente exportado en db.config.js

// Crear un nuevo cliente
exports.create = (req, res) => {
  let cliente = {
    ID_USUARIO: req.body.ID_USUARIO,
    CUI: req.body.CUI,
    PASAPORTE: req.body.PASAPORTE,
    NOMBRE: req.body.NOMBRE,
    APELLIDO: req.body.APELLIDO,
    CORREO: req.body.CORREO,
    TELEFONO: req.body.TELEFONO,
    NACIONALIDAD: req.body.NACIONALIDAD,
    DIRECCION: req.body.DIRECCION
  };

  Cliente.create(cliente)
    .then(result => {
      res.status(200).json({
        message: "Cliente creado con éxito con id = " + result.ID_CLIENTE,
        cliente: result,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Falló!",
        error: error.message
      });
    });
};

// Obtener todos los clientes
exports.retrieveAllClientes = (req, res) => {
  Cliente.findAll()
    .then(clienteInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todos los clientes con éxito!",
        clientes: clienteInfos
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
};

// Obtener cliente por ID
exports.getClienteById = (req, res) => {
  let clienteId = req.params.id;
  Cliente.findByPk(clienteId)
    .then(cliente => {
      if (cliente) {
        res.status(200).json({
          message: "Se obtuvo con éxito el cliente con id = " + clienteId,
          cliente: cliente
        });
      } else {
        res.status(404).json({
          message: "No se encontró el cliente con id = " + clienteId,
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

// Actualizar cliente por ID
exports.updateById = async (req, res) => {
  try {
    let clienteId = req.params.id;
    let cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      res.status(404).json({
        message: "No se encontró el cliente para actualizar con id = " + clienteId,
        cliente: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        ID_USUARIO: req.body.ID_USUARIO,
        CUI: req.body.CUI,
        PASAPORTE: req.body.PASAPORTE,
        NOMBRE: req.body.NOMBRE,
        APELLIDO: req.body.APELLIDO,
        CORREO: req.body.CORREO,
        TELEFONO: req.body.TELEFONO,
        NACIONALIDAD: req.body.NACIONALIDAD,
        DIRECCION: req.body.DIRECCION
      };
      let result = await Cliente.update(updatedObject, { returning: true, where: { ID_CLIENTE: clienteId } });

      if (!result[0]) {
        res.status(500).json({
          message: "Error -> No se puede actualizar el cliente con id = " + clienteId,
          error: "No se pudo actualizar",
        });
      }

      res.status(200).json({
        message: "Actualización exitosa del cliente con id = " + clienteId,
        cliente: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el cliente con id = " + req.params.id,
      error: error.message
    });
  }
};




exports.countClientes = async (req, res) => {
  try {
    const count = await Cliente.count(); // Asegúrate de que el modelo Cliente esté bien configurado
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error al contar los clientes", error });
  }
};


// Eliminar cliente por ID
exports.deleteById = async (req, res) => {
  try {
    let clienteId = req.params.id;
    let cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      res.status(404).json({
        message: "No existe un cliente con id = " + clienteId,
        error: "404",
      });
    } else {
      await cliente.destroy();
      res.status(200).json({
        message: "Eliminación exitosa del cliente con id = " + clienteId,
        cliente: cliente,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el cliente con id = " + req.params.id,
      error: error.message,
    });
  }
};
