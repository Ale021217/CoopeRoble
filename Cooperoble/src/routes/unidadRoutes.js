import express from 'express';
import * as unidadController from '../controllers/unidadController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

// Registrar unidad
router.post('/', unidadController.createUnidad);

// Actualizar unidad
router.put('/:id_unidad', unidadController.updateUnidad);

// Obtener todas las unidades
router.get('/', unidadController.getAllUnidades);

// Obtener una unidad por ID
router.get('/:id_unidad', unidadController.getUnidadById);

// Eliminar unidad
router.delete('/:id_unidad', unidadController.deleteUnidad);

export default router;
