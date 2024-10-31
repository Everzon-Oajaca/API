const express = require('express');
const router = express.Router();
const servicios = require('../controllers/servicios.controllers'); // Asegúrate de que el archivo servicios.controller.js esté en la ubicación correcta

// Crear un servicio
router.post('/api/servicios/create', servicios.create);
router.post('/create', servicios.create); // Alternativa sin el prefijo 'api/servicios'

// Obtener todos los servicios
router.get('/api/servicios/all', servicios.retrieveAllServicios);
router.get('/servicios/all', servicios.retrieveAllServicios);

// Obtener un servicio por su ID
router.get('/api/servicios/onebyid/:id', servicios.getServicioById);

// Actualizar un servicio por su ID
router.put('/api/servicios/update/:id', servicios.updateById);

// Eliminar un servicio por su ID
router.delete('/api/servicios/delete/:id', servicios.deleteById);

module.exports = router;
