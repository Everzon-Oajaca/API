const express = require('express');
const router = express.Router();
const empleados = require('../controllers/empleados.controllers'); // Asegúrate de que el archivo empleados.controller.js esté en la ubicación correcta

// Crear un empleado
router.post('/api/empleados/create', empleados.create);

router.post('/create', empleados.create); // Alternativa sin el prefijo 'api/empleados'
// Ruta para contar el número de empleados
router.get('/api/empleados/count', empleados.countEmpleados);

// Obtener todos los empleados
router.get('/api/empleados/all', empleados.retrieveAllEmpleados);
router.get('/empleados/all', empleados.retrieveAllEmpleados);

// Obtener un empleado por su ID
router.get('/api/empleados/onebyid/:id', empleados.getEmpleadoById);

// Actualizar un empleado por su ID
router.put('/api/empleados/update/:id', empleados.updateById);

// Eliminar un empleado por su ID
router.delete('/api/empleados/delete/:id', empleados.deleteById);

module.exports = router;
