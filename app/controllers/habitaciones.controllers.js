const db = require('../config/db.config.js');
const Habitacion = db.Habitacion; // Asegúrate de que Habitacion esté correctamente exportado en db.config.js
const Sequelize = require('sequelize');
// Crear una nueva habitación
exports.create = (req, res) => {
  let habitacion = {
    ID_SERVICIO: req.body.ID_SERVICIO,
    NUM_HABITACION: req.body.NUM_HABITACION,
    TIPO_HABITACION: req.body.TIPO_HABITACION,
    NUMERO_CAMAS: req.body.NUMERO_CAMAS,
    TIPO_DE_CAMA: req.body.TIPO_DE_CAMA,
    ESTADO: req.body.ESTADO,
    PRECIO: req.body.PRECIO,
    DESCUENTO: req.body.DESCUENTO,
    DESCRIPCION: req.body.DESCRIPCION
  };

  Habitacion.create(habitacion)
    .then(result => {
      res.status(200).json({
        message: "Habitación creada con éxito con id = " + result.ID_HABITACION,
        habitacion: result,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Falló!",
        error: error.message
      });
    });
};

// Contar habitaciones disponibles
exports.countHabitacionesDisponibles = async (req, res) => {
  try {
    const count = await Habitacion.count({
      where: { ESTADO: 'Disponible' } // Ajusta el estado según cómo se maneje en la base de datos
    });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({
      message: "Error al contar las habitaciones disponibles",
      error: error.message,
    });
  }
};


// Obtener habitaciones agrupadas por estado y tipo de habitación
exports.getHabitacionesPorEstadoYTipo = async (req, res) => {
  try {
    const habitacionesPorEstadoYTipo = await Habitacion.findAll({
      attributes: [
        'TIPO_HABITACION',
        'ESTADO',
        [Sequelize.fn('COUNT', Sequelize.col('ID_HABITACION')), 'cantidad']
      ],
      group: ['TIPO_HABITACION', 'ESTADO']
    });

    // Organiza los datos en un formato fácil de usar para el gráfico
    const ocupacionPorTipo = habitacionesPorEstadoYTipo.reduce((acc, item) => {
      const tipo = item.TIPO_HABITACION;
      const estado = item.ESTADO;
      const cantidad = item.dataValues.cantidad;

      if (!acc[tipo]) {
        acc[tipo] = { Ocupado: 0, Disponible: 0 };
      }
      acc[tipo][estado] = cantidad;
      return acc;
    }, {});

    // Transforma el objeto en un arreglo adecuado para el gráfico
    const resultado = Object.keys(ocupacionPorTipo).map(tipo => ({
      tipo,
      ocupado: ocupacionPorTipo[tipo].Ocupado || 0,
      disponible: ocupacionPorTipo[tipo].Disponible || 0
    }));

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener habitaciones por estado y tipo",
      error: error.message
    });
  }
};






// Obtener todas las habitaciones con su tipo y estado
exports.getHabitacionesConEstado = async (req, res) => {
  try {
    const habitaciones = await Habitacion.findAll({
      attributes: ['NUM_HABITACION', 'TIPO_HABITACION', 'ESTADO'],
    });
    res.status(200).json(habitaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener habitaciones', error: error.message });
  }
};


// Obtener todas las habitaciones
exports.retrieveAllHabitaciones = (req, res) => {
  Habitacion.findAll()
    .then(habitacionInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todas las habitaciones con éxito!",
        habitaciones: habitacionInfos
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
};

// Obtener habitación por ID
exports.getHabitacionById = (req, res) => {
  let habitacionId = req.params.id;
  Habitacion.findByPk(habitacionId)
    .then(habitacion => {
      if (habitacion) {
        res.status(200).json({
          message: "Se obtuvo con éxito la habitación con id = " + habitacionId,
          habitacion: habitacion
        });
      } else {
        res.status(404).json({
          message: "No se encontró la habitación con id = " + habitacionId,
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

// Actualizar habitación por ID
exports.updateById = async (req, res) => {
  try {
    let habitacionId = req.params.id;
    let habitacion = await Habitacion.findByPk(habitacionId);

    if (!habitacion) {
      res.status(404).json({
        message: "No se encontró la habitación para actualizar con id = " + habitacionId,
        habitacion: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        ID_SERVICIO: req.body.ID_SERVICIO,
        NUM_HABITACION: req.body.NUM_HABITACION,
        TIPO_HABITACION: req.body.TIPO_HABITACION,
        NUMERO_CAMAS: req.body.NUMERO_CAMAS,
        TIPO_DE_CAMA: req.body.TIPO_DE_CAMA,
        ESTADO: req.body.ESTADO,
        PRECIO: req.body.PRECIO,
        DESCUENTO: req.body.DESCUENTO,
        DESCRIPCION: req.body.DESCRIPCION
      };
      let result = await Habitacion.update(updatedObject, { returning: true, where: { ID_HABITACION: habitacionId } });

      if (!result[0]) {
        res.status(500).json({
          message: "Error -> No se puede actualizar la habitación con id = " + habitacionId,
          error: "No se pudo actualizar",
        });
      }

      res.status(200).json({
        message: "Actualización exitosa de la habitación con id = " + habitacionId,
        habitacion: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar la habitación con id = " + req.params.id,
      error: error.message
    });
  }
};

// Eliminar habitación por ID
exports.deleteById = async (req, res) => {
  try {
    let habitacionId = req.params.id;
    let habitacion = await Habitacion.findByPk(habitacionId);

    if (!habitacion) {
      res.status(404).json({
        message: "No existe una habitación con id = " + habitacionId,
        error: "404",
      });
    } else {
      await habitacion.destroy();
      res.status(200).json({
        message: "Eliminación exitosa de la habitación con id = " + habitacionId,
        habitacion: habitacion,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar la habitación con id = " + req.params.id,
      error: error.message,
    });
  }
};
