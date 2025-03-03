import * as reporteModel from '../models/reporteModel.js';
import { body, validationResult } from 'express-validator';

// Función para crear un nuevo reporte
export const createReporte = [
  // Validaciones (sin validar fecha_reporte)
  body('id_usuario').isInt().withMessage('El ID de usuario debe ser un número válido.'),
  body('unidad').isInt().withMessage('La unidad debe ser un número válido.'),
  body('imagen_averia').optional().isURL().withMessage('La imagen de la avería debe ser una URL válida si se proporciona.'),
  body('tipo_averia').notEmpty().withMessage('El tipo de avería es obligatorio.'),
  body('estado').notEmpty().withMessage('El estado es obligatorio.'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extraemos los campos; omitimos fecha_reporte para que la BD asigne la fecha actual
    const { id_usuario, unidad, imagen_averia, tipo_averia, estado } = req.body;

    try {
      const result = await reporteModel.createReporte({
        id_usuario,
        unidad,
        imagen_averia,
        tipo_averia,
        estado
      });
      res.status(201).json({ message: 'Reporte creado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el reporte.' });
    }
  }
];

// Función para actualizar un reporte por ID
export const updateReporte = [
  // Validaciones (sin validar fecha_reporte)
  body('id_usuario').isInt().withMessage('El ID de usuario debe ser un número válido.'),
  body('unidad').isInt().withMessage('La unidad debe ser un número válido.'),
  body('imagen_averia').optional().isURL().withMessage('La imagen de la avería debe ser una URL válida si se proporciona.'),
  body('tipo_averia').notEmpty().withMessage('El tipo de avería es obligatorio.'),
  body('estado').notEmpty().withMessage('El estado es obligatorio.'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id_reporte } = req.params;
    // Se omite fecha_reporte en la actualización para conservar la fecha original
    const { id_usuario, unidad, imagen_averia, tipo_averia, estado } = req.body;

    try {
      const result = await reporteModel.updateReporte(id_reporte, {
        id_usuario,
        unidad,
        imagen_averia,
        tipo_averia,
        estado
      });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Reporte no encontrado.' });
      }
      res.status(200).json({ message: 'Reporte actualizado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el reporte.' });
    }
  }
];

// Obtener todos los reportes
export const getAllReportes = async (req, res) => {
  try {
    const reportes = await reporteModel.getAllReportes();
    res.status(200).json(reportes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los reportes.' });
  }
};

// Obtener un reporte por ID
export const getReporteById = async (req, res) => {
  const { id_reporte } = req.params;
  try {
    const reporte = await reporteModel.getReporteById(id_reporte);
    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado.' });
    }
    res.status(200).json(reporte);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el reporte.' });
  }
};

// Eliminar un reporte por ID
export const deleteReporte = async (req, res) => {
  const { id_reporte } = req.params;
  try {
    const result = await reporteModel.deleteReporte(id_reporte);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reporte no encontrado.' });
    }
    res.status(200).json({ message: 'Reporte eliminado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el reporte.' });
  }
};
