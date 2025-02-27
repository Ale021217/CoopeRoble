import express from 'express';
import * as averiaController from '../controllers/averiaController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

// Registrar avería
router.post('/', averiaController.createAveria);

// Actualizar avería
router.put('/:id_averia', averiaController.updateAveria);

// Obtener todas las averías
router.get('/', averiaController.getAllAverias);

// Obtener una avería por ID
router.get('/:id_averia', averiaController.getAveriaById);

// Eliminar avería
router.delete('/:id_averia', averiaController.deleteAveria);

export default router;
