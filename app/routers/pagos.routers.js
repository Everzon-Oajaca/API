const express = require('express');
const router = express.Router();
const pagos = require('../controllers/pagos.controllers'); // Asegúrate de que el controlador esté correctamente exportado

// Crear un nuevo pago
router.post('/api/pagos/create', pagos.create);
router.post('/create', pagos.create); // No repitas el prefijo 'api/pagos'

// Obtener todos los pagos
router.get('/api/pagos/all', pagos.retrieveAllPagos);
router.get('/pagos/all', pagos.retrieveAllPagos);

// Obtener un pago por su ID
router.get('/api/pagos/onebyid/:id', pagos.getPagoById);

// Actualizar un pago por su ID
router.put('/api/pagos/update/:id', pagos.updateById);

// Eliminar un pago por su ID
router.delete('/api/pagos/delete/:id', pagos.deleteById);

module.exports = router;
