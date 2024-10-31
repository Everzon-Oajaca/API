const db = require('../config/db.config.js');
const Reporte = db.Reporte; // Asegúrate de que Reporte esté correctamente exportado en db.config.js

// Crear un nuevo reporte
exports.create = (req, res) => {
  let reporte = {
    ID_EMPLEADO: req.body.ID_EMPLEADO,
    DEPARTAMENTO: req.body.DEPARTAMENTO,
    FECHA_GENERADO: req.body.FECHA_GENERADO,
    DETALLE: req.body.DETALLE
  };

  Reporte.create(reporte)
    .then(result => {
      res.status(200).json({
        message: "Reporte creado con éxito con id = " + result.ID_REPORTE,
        reporte: result,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Falló!",
        error: error.message
      });
    });
};

// Obtener todos los reportes
exports.retrieveAllReportes = (req, res) => {
  Reporte.findAll()
    .then(reporteInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todos los reportes con éxito!",
        reportes: reporteInfos
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
};

// Obtener reporte por ID
exports.getReporteById = (req, res) => {
  let reporteId = req.params.id;
  Reporte.findByPk(reporteId)
    .then(reporte => {
      if (reporte) {
        res.status(200).json({
          message: "Se obtuvo con éxito el reporte con id = " + reporteId,
          reporte: reporte
        });
      } else {
        res.status(404).json({
          message: "No se encontró el reporte con id = " + reporteId,
          error: "404"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
};

// Actualizar reporte por ID
exports.updateById = async (req, res) => {
  try {
    let reporteId = req.params.id;
    let reporte = await Reporte.findByPk(reporteId);

    if (!reporte) {
      res.status(404).json({
        message: "No se encontró el reporte para actualizar con id = " + reporteId,
        reporte: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        ID_EMPLEADO: req.body.ID_EMPLEADO,
        DEPARTAMENTO: req.body.DEPARTAMENTO,
        FECHA_GENERADO: req.body.FECHA_GENERADO,
        DETALLE: req.body.DETALLE
      };
      let result = await Reporte.update(updatedObject, { returning: true, where: { ID_REPORTE: reporteId } });

      if (!result[0]) {
        res.status(500).json({
          message: "Error -> No se puede actualizar el reporte con id = " + reporteId,
          error: "No se pudo actualizar",
        });
      }

      res.status(200).json({
        message: "Actualización exitosa del reporte con id = " + reporteId,
        reporte: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el reporte con id = " + req.params.id,
      error: error.message
    });
  }
};

// Eliminar reporte por ID
exports.deleteById = async (req, res) => {
  try {
    let reporteId = req.params.id;
    let reporte = await Reporte.findByPk(reporteId);

    if (!reporte) {
      res.status(404).json({
        message: "No existe un reporte con id = " + reporteId,
        error: "404",
      });
    } else {
      await reporte.destroy();
      res.status(200).json({
        message: "Eliminación exitosa del reporte con id = " + reporteId,
        reporte: reporte,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el reporte con id = " + req.params.id,
      error: error.message,
    });
  }
};
