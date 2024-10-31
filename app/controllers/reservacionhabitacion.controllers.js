const db = require('../config/db.config.js');
const ReservacionHabitacion = db.ReservacionHabitacion; // Asegúrate de que ReservacionHabitacion esté correctamente exportado en db.config.js

// Crear una nueva reservación de habitación
exports.create = (req, res) => {
  let reservacionHabitacion = {
    ID_RESERVACION: req.body.ID_RESERVACION,
    ID_HABITACION: req.body.ID_HABITACION,
    FECHA_ENTRADA: req.body.FECHA_ENTRADA,
    FECHA_SALIDA: req.body.FECHA_SALIDA,
    ESTADO: req.body.ESTADO
  };

  ReservacionHabitacion.create(reservacionHabitacion)
    .then(result => {
      res.status(200).json({
        message: "Reservación de habitación creada con éxito con id = " + result.ID_RESERVACION_HABITACION,
        reservacionHabitacion: result,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Falló!",
        error: error.message
      });
    });
};

// Obtener todas las reservaciones de habitaciones
exports.retrieveAllReservacionHabitaciones = (req, res) => {
  ReservacionHabitacion.findAll()
    .then(reservacionHabitacionInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todas las reservaciones de habitaciones con éxito!",
        reservacionHabitaciones: reservacionHabitacionInfos
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
};

// Obtener reservación de habitación por ID
exports.getReservacionHabitacionById = (req, res) => {
  let reservacionHabitacionId = req.params.id;
  ReservacionHabitacion.findByPk(reservacionHabitacionId)
    .then(reservacionHabitacion => {
      if (reservacionHabitacion) {
        res.status(200).json({
          message: "Se obtuvo con éxito la reservación de habitación con id = " + reservacionHabitacionId,
          reservacionHabitacion: reservacionHabitacion
        });
      } else {
        res.status(404).json({
          message: "No se encontró la reservación de habitación con id = " + reservacionHabitacionId,
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

// Actualizar reservación de habitación por ID
exports.updateById = async (req, res) => {
  try {
    let reservacionHabitacionId = req.params.id;
    let reservacionHabitacion = await ReservacionHabitacion.findByPk(reservacionHabitacionId);

    if (!reservacionHabitacion) {
      res.status(404).json({
        message: "No se encontró la reservación de habitación para actualizar con id = " + reservacionHabitacionId,
        reservacionHabitacion: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        ID_RESERVACION: req.body.ID_RESERVACION,
        ID_HABITACION: req.body.ID_HABITACION,
        FECHA_ENTRADA: req.body.FECHA_ENTRADA,
        FECHA_SALIDA: req.body.FECHA_SALIDA,
        ESTADO: req.body.ESTADO
      };
      let result = await ReservacionHabitacion.update(updatedObject, { returning: true, where: { ID_RESERVACION_HABITACION: reservacionHabitacionId } });

      if (!result[0]) {
        res.status(500).json({
          message: "Error -> No se puede actualizar la reservación de habitación con id = " + reservacionHabitacionId,
          error: "No se pudo actualizar",
        });
      }

      res.status(200).json({
        message: "Actualización exitosa de la reservación de habitación con id = " + reservacionHabitacionId,
        reservacionHabitacion: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar la reservación de habitación con id = " + req.params.id,
      error: error.message
    });
  }
};

// Eliminar reservación de habitación por ID
exports.deleteById = async (req, res) => {
  try {
    let reservacionHabitacionId = req.params.id;
    let reservacionHabitacion = await ReservacionHabitacion.findByPk(reservacionHabitacionId);

    if (!reservacionHabitacion) {
      res.status(404).json({
        message: "No existe una reservación de habitación con id = " + reservacionHabitacionId,
        error: "404",
      });
    } else {
      await reservacionHabitacion.destroy();
      res.status(200).json({
        message: "Eliminación exitosa de la reservación de habitación con id = " + reservacionHabitacionId,
        reservacionHabitacion: reservacionHabitacion,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar la reservación de habitación con id = " + req.params.id,
      error: error.message,
    });
  }
};
