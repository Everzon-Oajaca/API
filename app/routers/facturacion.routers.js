const express = require('express');
const router = express.Router();
const facturacion = require('../controllers/facturacion.controllers');

// Crear una factura
router.post('/api/facturacion/create', facturacion.create);
router.post('/create', facturacion.create); // Ruta sin prefijo adicional
// Ruta para obtener ingreso mensual
router.get('/api/facturacion/ingreso-mensual', facturacion.getIngresoMensual);

// Obtener todas las facturas
router.get('/api/facturacion/all', facturacion.retrieveAllFacturas);
router.get('/facturacion/all', facturacion.retrieveAllFacturas);
// Ruta para contar el número de facturas pendientes
router.get('/api/facturacion/pendientes', facturacion.countFacturasPendientes);

// Obtener una factura por su ID
router.get('/api/facturacion/onebyid/:id', facturacion.getFacturaById);

// Actualizar una factura por su ID
router.put('/api/facturacion/update/:id', facturacion.updateById);

// Eliminar una factura por su ID
router.delete('/api/facturacion/delete/:id', facturacion.deleteById);

module.exports = router;
