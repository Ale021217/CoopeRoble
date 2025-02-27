import express from 'express';
import * as reporteController from '../controllers/reporteController.js';
import { validationResult } from 'express-validator';

const router = express.Router();

// Registrar reporte
router.post('/', reporteController.createReporte);

// Actualizar reporte
router.put('/:id_reporte', reporteController.updateReporte);

// Obtener todos los reportes
router.get('/', reporteController.getAllReportes);

// Obtener un reporte por ID
router.get('/:id_reporte', reporteController.getReporteById);

// Eliminar reporte
router.delete('/:id_reporte', reporteController.deleteReporte);

export default router;
