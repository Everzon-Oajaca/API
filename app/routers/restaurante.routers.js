const express = require('express');
const router = express.Router();
const restaurantes = require('../controllers/restaurante.controllers');

// Crear un restaurante
router.post('/api/restaurantes/create', restaurantes.create);
router.post('/create', restaurantes.create); // No repitas el prefijo 'api/restaurantes'

// Obtener todos los restaurantes
router.get('/api/restaurantes/all', restaurantes.retrieveAllRestaurantes);
router.get('/restaurantes/all', restaurantes.retrieveAllRestaurantes);

// Obtener un restaurante por su ID
router.get('/api/restaurantes/onebyid/:id', restaurantes.getRestauranteById);

// Actualizar un restaurante por su ID
router.put('/api/restaurantes/update/:id', restaurantes.updateById);

// Eliminar un restaurante por su ID
router.delete('/api/restaurantes/delete/:id', restaurantes.deleteById);

module.exports = router;
