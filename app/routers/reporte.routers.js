const express = require('express');
const router = express.Router();
const reportes = require('../controllers/reporte.controllers');

// Crear un nuevo reporte
router.post('/api/reportes/create', reportes.create);
router.post('/create', reportes.create); // Ruta sin el prefijo 'api/reportes'

// Obtener todos los reportes
router.get('/api/reportes/all', reportes.retrieveAllReportes);
router.get('/reportes/all', reportes.retrieveAllReportes);

// Obtener un reporte por su ID
router.get('/api/reportes/onebyid/:id', reportes.getReporteById);

// Actualizar un reporte por su ID
router.put('/api/reportes/update/:id', reportes.updateById);

// Eliminar un reporte por su ID
router.delete('/api/reportes/delete/:id', reportes.deleteById);

module.exports = router;
