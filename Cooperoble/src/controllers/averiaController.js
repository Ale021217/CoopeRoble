import * as averiaModel from '../models/averiaModel.js';
import { body, validationResult } from 'express-validator';

// Función para crear una nueva avería
export const createAveria = [
  // Validaciones
  body('tipo_averia').notEmpty().withMessage('El tipo de avería es obligatorio.'),
  body('descripcion').notEmpty().withMessage('La descripción es obligatoria.')
    .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres.'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tipo_averia, descripcion } = req.body;

    try {
      const result = await averiaModel.createAveria({ tipo_averia, descripcion });
      res.status(201).json({ message: 'Avería creada exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la avería.' });
    }
  }
];

// Función para actualizar una avería por ID
export const updateAveria = [
  // Validaciones
  body('tipo_averia').notEmpty().withMessage('El tipo de avería es obligatorio.'),
  body('descripcion').notEmpty().withMessage('La descripción es obligatoria.')
    .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres.'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id_averia } = req.params;
    const { tipo_averia, descripcion } = req.body;

    try {
      const result = await averiaModel.updateAveria(id_averia, { tipo_averia, descripcion });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Avería no encontrada.' });
      }
      res.status(200).json({ message: 'Avería actualizada exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la avería.' });
    }
  }
];

// Obtener todas las averías
export const getAllAverias = async (req, res) => {
  try {
    const averias = await averiaModel.getAllAverias();
    res.status(200).json(averias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las averías.' });
  }
};

// Obtener una avería por ID
export const getAveriaById = async (req, res) => {
  const { id_averia } = req.params;
  try {
    const averia = await averiaModel.getAveriaById(id_averia);
    if (!averia) {
      return res.status(404).json({ message: 'Avería no encontrada.' });
    }
    res.status(200).json(averia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la avería.' });
  }
};

// Eliminar una avería por ID
export const deleteAveria = async (req, res) => {
  const { id_averia } = req.params;
  try {
    const result = await averiaModel.deleteAveria(id_averia);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Avería no encontrada.' });
    }
    res.status(200).json({ message: 'Avería eliminada exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la avería.' });
  }
};
