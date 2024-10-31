const express = require('express');
const router = express.Router();
const habitaciones = require('../controllers/habitaciones.controllers'); // Asegúrate de que el archivo habitaciones.controller.js esté en la ubicación correcta

// Crear una habitación
router.post('/api/habitaciones/create', habitaciones.create);
router.post('/create', habitaciones.create); // Alternativa sin el prefijo 'api/habitaciones'

// Ruta para contar las habitaciones disponibles
router.get('/api/habitaciones/disponibles', habitaciones.countHabitacionesDisponibles);

// Nueva ruta para obtener habitaciones agrupadas por estado y tipo de habitación
router.get('/api/habitaciones/estado-tipo', habitaciones.getHabitacionesPorEstadoYTipo);





router.get('/api/habitaciones/estado-tipo', habitaciones.getHabitacionesConEstado);

// Obtener todas las habitaciones
router.get('/api/habitaciones/all', habitaciones.retrieveAllHabitaciones);
router.get('/habitaciones/all', habitaciones.retrieveAllHabitaciones);

// Obtener una habitación por su ID
router.get('/api/habitaciones/onebyid/:id', habitaciones.getHabitacionById);

// Actualizar una habitación por su ID
router.put('/api/habitaciones/update/:id', habitaciones.updateById);

// Eliminar una habitación por su ID
router.delete('/api/habitaciones/delete/:id', habitaciones.deleteById);

module.exports = router;
