const express = require('express');
const router = express.Router();
const clientes = require('../controllers/clientes.controllers'); // Asegúrate de tener el controlador de clientes correctamente configurado

// Crear un cliente
router.post('/api/clientes/create', clientes.create);
router.post('/create', clientes.create); // Alternativa sin el prefijo 'api/clientes'


// Obtener el conteo de clientes
router.get('/api/clientes/count', clientes.countClientes);

// Obtener todos los clientes
router.get('/api/clientes/all', clientes.retrieveAllClientes);
router.get('/clientes/all', clientes.retrieveAllClientes);

// Obtener un cliente por su ID
router.get('/api/clientes/onebyid/:id', clientes.getClienteById);

// Actualizar un cliente por su ID
router.put('/api/clientes/update/:id', clientes.updateById);

// Eliminar un cliente por su ID
router.delete('/api/clientes/delete/:id', clientes.deleteById);

module.exports = router;
