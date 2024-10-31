const db = require('../config/db.config.js');
const Usuario = db.Usuario;



// Utilidad para manejar respuestas de error
const handleErrorResponse = (res, error, message, code = 500) => {
  res.status(code).json({
    success: false,
    message,
    error: error.message || error,
  });
};

exports.create = (req, res) => {
  const usuario = {
    USUARIO: req.body.usuario,
    CORREO: req.body.correo,
    CONTRASEÑA: req.body.contraseña,
    FECHA_ULTIMO_ACCESO: req.body.fecha_ultimo_acceso || null
  };

  Usuario.create(usuario)
    .then(result => {
      res.status(200).json({
        message: "Usuario creado con éxito con id = " + result.ID_USUARIO,
        usuario: result,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Falló!",
        error: error.message
      });
    });
};


// Método de login
exports.login = async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    const user = await Usuario.findOne({
      where: { USUARIO: usuario, CONTRASEÑA: contraseña },
    });

    if (user) {
      user.FECHA_ULTIMO_ACCESO = new Date();
      await user.save();

      res.status(200).json({
        success: true,
        message: "Login exitoso",
        userId: user.ID_USUARIO,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Credenciales incorrectas",
      });
    }
  } catch (error) {
    handleErrorResponse(res, error, "Error en el servidor");
  }
};




exports.retrieveAllUsuarios = (req, res) => {
  Usuario.findAll()
    .then(usuarioInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todos los usuarios con éxito!",
        usuarios: usuarioInfos
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

exports.getUsuarioById = (req, res) => {
  let usuarioId = req.params.id;
  Usuario.findByPk(usuarioId)
    .then(usuario => {
      if (usuario) {
        res.status(200).json({
          message: "Se obtuvo con éxito el usuario con id = " + usuarioId,
          usuario: usuario
        });
      } else {
        res.status(404).json({
          message: "No se encontró el usuario con id = " + usuarioId,
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

exports.updateById = async (req, res) => {
  try {
    let usuarioId = req.params.id;
    let usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      res.status(404).json({
        message: "No se encontró el usuario para actualizar con id = " + usuarioId,
        usuario: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        USUARIO: req.body.USUARIO,
        CORREO: req.body.CORREO,
        CONTRASEÑA: req.body.CONTRASEÑA,
        FECHA_ULTIMO_ACCESO: req.body.FECHA_ULTIMO_ACCESO
      };
      let result = await Usuario.update(updatedObject, { returning: true, where: { ID_USUARIO: usuarioId } });

      if (!result[0]) {
        res.status(500).json({
          message: "Error -> No se puede actualizar el usuario con id = " + req.params.id,
          error: "No se pudo actualizar",
        });
      }

      res.status(200).json({
        message: "Actualización exitosa del usuario con id = " + usuarioId,
        usuario: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el usuario con id = " + req.params.id,
      error: error.message
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    let usuarioId = req.params.id;
    let usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      res.status(404).json({
        message: "No existe un usuario con id = " + usuarioId,
        error: "404",
      });
    } else {
      await usuario.destroy();
      res.status(200).json({
        message: "Eliminación exitosa del usuario con id = " + usuarioId,
        usuario: usuario,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el usuario con id = " + req.params.id,
      error: error.message,
    });
  }
};
