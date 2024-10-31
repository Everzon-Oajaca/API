const db = require('../config/db.config.js');
const Restaurante = db.Restaurante;

// Crear un nuevo restaurante
exports.create = (req, res) => {
  let restaurante = {
    NOMBRE: req.body.NOMBRE,
    UBICACION: req.body.UBICACION,
    DESCRIPCION: req.body.DESCRIPCION
  };

  Restaurante.create(restaurante)
    .then(result => {
      res.status(200).json({
        message: "Restaurante creado con éxito con id = " + result.ID_RESTAURANTE,
        restaurante: result,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Falló!",
        error: error.message
      });
    });
};

// Obtener todos los restaurantes
exports.retrieveAllRestaurantes = (req, res) => {
  Restaurante.findAll()
    .then(restauranteInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todos los restaurantes con éxito!",
        restaurantes: restauranteInfos
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

// Obtener restaurante por ID
exports.getRestauranteById = (req, res) => {
  let restauranteId = req.params.id;
  Restaurante.findByPk(restauranteId)
    .then(restaurante => {
      if (restaurante) {
        res.status(200).json({
          message: "Se obtuvo con éxito el restaurante con id = " + restauranteId,
          restaurante: restaurante
        });
      } else {
        res.status(404).json({
          message: "No se encontró el restaurante con id = " + restauranteId,
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

// Actualizar restaurante por ID
exports.updateById = async (req, res) => {
  try {
    let restauranteId = req.params.id;
    let restaurante = await Restaurante.findByPk(restauranteId);

    if (!restaurante) {
      res.status(404).json({
        message: "No se encontró el restaurante para actualizar con id = " + restauranteId,
        restaurante: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        NOMBRE: req.body.NOMBRE,
        UBICACION: req.body.UBICACION,
        DESCRIPCION: req.body.DESCRIPCION
      };
      let result = await Restaurante.update(updatedObject, { returning: true, where: { ID_RESTAURANTE: restauranteId } });

      if (!result[0]) {
        res.status(500).json({
          message: "Error -> No se puede actualizar el restaurante con id = " + restauranteId,
          error: "No se pudo actualizar",
        });
      }

      res.status(200).json({
        message: "Actualización exitosa del restaurante con id = " + restauranteId,
        restaurante: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el restaurante con id = " + req.params.id,
      error: error.message
    });
  }
};

// Eliminar restaurante por ID
exports.deleteById = async (req, res) => {
  try {
    let restauranteId = req.params.id;
    let restaurante = await Restaurante.findByPk(restauranteId);

    if (!restaurante) {
      res.status(404).json({
        message: "No existe un restaurante con id = " + restauranteId,
        error: "404",
      });
    } else {
      await restaurante.destroy();
      res.status(200).json({
        message: "Eliminación exitosa del restaurante con id = " + restauranteId,
        restaurante: restaurante,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el restaurante con id = " + req.params.id,
      error: error.message,
    });
  }
};
