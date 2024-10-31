const db = require('../config/db.config.js');
const Servicio = db.Servicio; // Asegúrate de que Servicio esté correctamente exportado en db.config.js

// Crear un nuevo servicio
exports.create = (req, res) => {
  let servicio = {
    TIPO_SERVICIO: req.body.TIPO_SERVICIO,
    DURACION: req.body.DURACION,
    DESCRIPCION: req.body.DESCRIPCION,
    FECHA_HORA: req.body.FECHA_HORA,
    PRECIO: req.body.PRECIO
  };

  Servicio.create(servicio)
    .then(result => {
      res.status(200).json({
        message: "Servicio creado con éxito con id = " + result.ID_SERVICIO,
        servicio: result,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Falló!",
        error: error.message
      });
    });
};

// Obtener todos los servicios
exports.retrieveAllServicios = (req, res) => {
  Servicio.findAll()
    .then(servicioInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todos los servicios con éxito!",
        servicios: servicioInfos
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
};

// Obtener servicio por ID
exports.getServicioById = (req, res) => {
  let servicioId = req.params.id;
  Servicio.findByPk(servicioId)
    .then(servicio => {
      if (servicio) {
        res.status(200).json({
          message: "Se obtuvo con éxito el servicio con id = " + servicioId,
          servicio: servicio
        });
      } else {
        res.status(404).json({
          message: "No se encontró el servicio con id = " + servicioId,
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

// Actualizar servicio por ID
exports.updateById = async (req, res) => {
  try {
    let servicioId = req.params.id;
    let servicio = await Servicio.findByPk(servicioId);

    if (!servicio) {
      res.status(404).json({
        message: "No se encontró el servicio para actualizar con id = " + servicioId,
        servicio: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        TIPO_SERVICIO: req.body.TIPO_SERVICIO,
        DURACION: req.body.DURACION,
        DESCRIPCION: req.body.DESCRIPCION,
        FECHA_HORA: req.body.FECHA_HORA,
        PRECIO: req.body.PRECIO
      };
      let result = await Servicio.update(updatedObject, { returning: true, where: { ID_SERVICIO: servicioId } });

      if (!result[0]) {
        res.status(500).json({
          message: "Error -> No se puede actualizar el servicio con id = " + req.params.id,
          error: "No se pudo actualizar",
        });
      }

      res.status(200).json({
        message: "Actualización exitosa del servicio con id = " + servicioId,
        servicio: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el servicio con id = " + req.params.id,
      error: error.message
    });
  }
};

// Eliminar servicio por ID
exports.deleteById = async (req, res) => {
  try {
    let servicioId = req.params.id;
    let servicio = await Servicio.findByPk(servicioId);

    if (!servicio) {
      res.status(404).json({
        message: "No existe un servicio con id = " + servicioId,
        error: "404",
      });
    } else {
      await servicio.destroy();
      res.status(200).json({
        message: "Eliminación exitosa del servicio con id = " + servicioId,
        servicio: servicio,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el servicio con id = " + req.params.id,
      error: error.message,
    });
  }
};
