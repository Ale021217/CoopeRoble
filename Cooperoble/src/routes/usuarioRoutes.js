import express from 'express';
import * as usuarioController from '../controllers/usuarioController.js';

const router = express.Router();

// Registrar usuario
router.post('/signup', usuarioController.signup);

// Iniciar sesión
router.post('/login', usuarioController.login);

// Obtener todos los usuarios
router.get('/', usuarioController.getAllUsuarios);

// Obtener un usuario por ID
router.get('/:id_usuario', usuarioController.getUsuarioById);

// Actualizar usuario
router.put('/:id_usuario', usuarioController.updateUsuario);

// Eliminar usuario
router.delete('/:id_usuario', usuarioController.deleteUsuario);

export default router;
