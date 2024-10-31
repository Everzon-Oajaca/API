const db = require('../config/db.config.js');
const Empleado = db.Empleado; // Asegúrate de que Empleado esté correctamente exportado en db.config.js

// Crear un nuevo empleado
exports.create = (req, res) => {
  console.log("Datos recibidos:", req.body); // Depuración para ver los datos recibidos


  let empleado = {
    ID_USUARIO: req.body.ID_USUARIO,
    CUI: req.body.CUI,
    NIT: req.body.NIT,
    NOMBRE: req.body.NOMBRE,
    APELLIDO: req.body.APELLIDO,
    CORREO: req.body.CORREO,
    TELEFONO: req.body.TELEFONO,
    ROL_ADMINISTRATIVO: req.body.ROL_ADMINISTRATIVO,
    FECHA_CONTRATO: req.body.FECHA_CONTRATO,
    ESTADO: req.body.ESTADO,
    TURNO: req.body.TURNO,
    SALARIO: req.body.SALARIO,
    GENERO: req.body.GENERO,
    DEPARTAMENTO: req.body.DEPARTAMENTO,
    FECHA_DESPIDO: req.body.FECHA_DESPIDO
  };
  Empleado.create(empleado)
  .then(result => {
    if (result) {
      console.log("Empleado creado con éxito:", result);
      res.status(200).json({
        message: "Empleado creado con éxito con id = " + result.ID_EMPLEADO,
        empleado: result,
      });
    } else {
      console.error("Resultado inesperado: el empleado no fue creado.");
      res.status(500).json({
        message: "Error inesperado al crear el empleado.",
      });
    }
  })
  .catch(error => {
    console.error("Error al crear empleado:", error); // Imprime el error completo en la consola
    res.status(500).json({
      message: "¡Falló al crear el empleado!",
      error: error.message || "Error desconocido."
    });
  });
};






// Contar el número de empleados
exports.countEmpleados = async (req, res) => {
  try {
    const count = await Empleado.count();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({
      message: "Error al contar los empleados",
      error: error.message,
    });
  }
};

// Obtener todos los empleados
exports.retrieveAllEmpleados = (req, res) => {
  Empleado.findAll()
    .then(empleadoInfos => {
      res.status(200).json({
        message: "¡Se obtuvieron todos los empleados con éxito!",
        empleados: empleadoInfos
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "¡Error!",
        error: error
      });
    });
};

// Obtener empleado por ID
exports.getEmpleadoById = (req, res) => {
  let empleadoId = req.params.id;
  Empleado.findByPk(empleadoId)
    .then(empleado => {
      if (empleado) {
        res.status(200).json({
          message: "Se obtuvo con éxito el empleado con id = " + empleadoId,
          empleado: empleado
        });
      } else {
        res.status(404).json({
          message: "No se encontró el empleado con id = " + empleadoId,
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

// Actualizar empleado por ID
exports.updateById = async (req, res) => {
  try {
    let empleadoId = req.params.id;
    let empleado = await Empleado.findByPk(empleadoId);

    if (!empleado) {
      res.status(404).json({
        message: "No se encontró el empleado para actualizar con id = " + empleadoId,
        empleado: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        ID_USUARIO: req.body.ID_USUARIO,
        CUI: req.body.CUI,
        NIT: req.body.NIT,
        NOMBRE: req.body.NOMBRE,
        APELLIDO: req.body.APELLIDO,
        CORREO: req.body.CORREO,
        TELEFONO: req.body.TELEFONO,
        ROL_ADMINISTRATIVO: req.body.ROL_ADMINISTRATIVO,
        FECHA_CONTRATO: req.body.FECHA_CONTRATO,
        ESTADO: req.body.ESTADO,
        TURNO: req.body.TURNO,
        SALARIO: req.body.SALARIO,
        GENERO: req.body.GENERO,
        DEPARTAMENTO: req.body.DEPARTAMENTO,
        FECHA_DESPIDO: req.body.FECHA_DESPIDO
      };
      let result = await Empleado.update(updatedObject, { returning: true, where: { ID_EMPLEADO: empleadoId } });

      if (!result[0]) {
        res.status(500).json({
          message: "Error -> No se puede actualizar el empleado con id = " + empleadoId,
          error: "No se pudo actualizar",
        });
      }

      res.status(200).json({
        message: "Actualización exitosa del empleado con id = " + empleadoId,
        empleado: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el empleado con id = " + req.params.id,
      error: error.message
    });
  }
};

// Eliminar empleado por ID
exports.deleteById = async (req, res) => {
  try {
    let empleadoId = req.params.id;
    let empleado = await Empleado.findByPk(empleadoId);

    if (!empleado) {
      res.status(404).json({
        message: "No existe un empleado con id = " + empleadoId,
        error: "404",
      });
    } else {
      await empleado.destroy();
      res.status(200).json({
        message: "Eliminación exitosa del empleado con id = " + empleadoId,
        empleado: empleado,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el empleado con id = " + req.params.id,
      error: error.message,
    });
  }
};
