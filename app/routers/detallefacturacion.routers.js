const express = require('express');
const router = express.Router();
const detalleFacturacion = require('../controllers/detallefacturacion.controllers');

// Crear un nuevo detalle de facturación
router.post('/api/detalleFacturacion/create', detalleFacturacion.create);
router.post('/create', detalleFacturacion.create); // Ruta sin el prefijo 'api/detalleFacturacion'

// Obtener todos los detalles de facturación
router.get('/api/detalleFacturacion/all', detalleFacturacion.retrieveAllDetalles);
router.get('/detalleFacturacion/all', detalleFacturacion.retrieveAllDetalles);

// Obtener un detalle de facturación por su ID
router.get('/api/detalleFacturacion/onebyid/:id', detalleFacturacion.getDetalleById);

// Actualizar un detalle de facturación por su ID
router.put('/api/detalleFacturacion/update/:id', detalleFacturacion.updateById);

// Eliminar un detalle de facturación por su ID
router.delete('/api/detalleFacturacion/delete/:id', detalleFacturacion.deleteById);

module.exports = router;
