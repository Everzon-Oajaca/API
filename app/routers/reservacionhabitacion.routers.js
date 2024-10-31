const express = require('express');
const router = express.Router();
const reservacionHabitaciones = require('../controllers/reservacionhabitacion.controllers'); // Asegúrate de que el archivo reservacionHabitacion.controller.js esté en la ubicación correcta

// Crear una nueva reservación de habitación
router.post('/api/reservacionHabitacion/create', reservacionHabitaciones.create);
router.post('/create', reservacionHabitaciones.create); // Alternativa sin el prefijo 'api/reservacionHabitacion'

// Obtener todas las reservaciones de habitaciones
router.get('/api/reservacionHabitacion/all', reservacionHabitaciones.retrieveAllReservacionHabitaciones);
router.get('/reservacionHabitacion/all', reservacionHabitaciones.retrieveAllReservacionHabitaciones);

// Obtener una reservación de habitación por su ID
router.get('/api/reservacionHabitacion/onebyid/:id', reservacionHabitaciones.getReservacionHabitacionById);

// Actualizar una reservación de habitación por su ID
router.put('/api/reservacionHabitacion/update/:id', reservacionHabitaciones.updateById);

// Eliminar una reservación de habitación por su ID
router.delete('/api/reservacionHabitacion/delete/:id', reservacionHabitaciones.deleteById);

module.exports = router;
