import express from 'express';
import * as reparacionController from '../controllers/reparacionController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

// Registrar una reparación
router.post('/', reparacionController.createReparacion);

// Obtener todas las reparaciones
router.get('/', reparacionController.getAllReparaciones);

// Obtener una reparación por ID
router.get('/:id_reparacion', reparacionController.getReparacionById);

// Actualizar una reparación por ID
router.put('/:id_reparacion', reparacionController.updateReparacion);

// Eliminar una reparación por ID
router.delete('/:id_reparacion', reparacionController.deleteReparacion);

export default router;
