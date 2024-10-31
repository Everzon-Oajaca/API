const express = require('express');
const router = express.Router();
const pedidos = require('../controllers/pedidos.controllers');

// Crear un pedido
router.post('/api/pedidos/create', pedidos.create);
router.post('/create', pedidos.create); // No repitas el prefijo 'api/pedidos'

// Obtener todos los pedidos
router.get('/api/pedidos/all', pedidos.retrieveAllPedidos);
router.get('/pedidos/all', pedidos.retrieveAllPedidos);

// Obtener un pedido por su ID
router.get('/api/pedidos/onebyid/:id', pedidos.getPedidoById);

// Actualizar un pedido por su ID
router.put('/api/pedidos/update/:id', pedidos.updateById);

// Eliminar un pedido por su ID
router.delete('/api/pedidos/delete/:id', pedidos.deleteById);

module.exports = router;
