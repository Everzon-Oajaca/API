const express = require('express');
const router = express.Router();
const usuarios = require('../controllers/usuarios.controllers');



// Ruta para el login
router.post('/api/usuarios/login', usuarios.login);

// Crear un usuario
router.post('/api/usuarios/create', usuarios.create);
// Crear un usuario
router.post('/create', usuarios.create); // No repitas el prefijo 'api/usuarios'

// Obtener todos los usuarios
router.get('/api/usuarios/all', usuarios.retrieveAllUsuarios);
router.get('/usuarios/all', usuarios.retrieveAllUsuarios);

// Obtener un usuario por su ID
router.get('/api/usuarios/onebyid/:id', usuarios.getUsuarioById);

// Actualizar un usuario por su ID
router.put('/api/usuarios/update/:id', usuarios.updateById);

// Eliminar un usuario por su ID
router.delete('/api/usuarios/delete/:id', usuarios.deleteById);

module.exports = router;
