import * as unidadModel from '../models/unidadModel.js';
import { body, validationResult } from 'express-validator';

// Función para crear una nueva unidad
export const createUnidad = [
  // Validaciones
  body('modelo').notEmpty().withMessage('El modelo es obligatorio.'),
  body('marca').notEmpty().withMessage('La marca es obligatoria.'),
  body('año').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('El año debe ser un número válido entre 1900 y el año actual.'),
  body('placa').notEmpty().withMessage('La placa es obligatoria.')
    .matches(/^[A-Z0-9]{1,10}$/).withMessage('La placa debe contener solo letras mayúsculas y números (máximo 10 caracteres).'),
  body('estado').isIn(['activo', 'inactivo']).withMessage('El estado debe ser "activo" o "inactivo".'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { modelo, marca, año, placa, estado } = req.body;

    try {
      const result = await unidadModel.createUnidad({ modelo, marca, año, placa, estado });
      res.status(201).json({ message: 'Unidad creada exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la unidad.' });
    }
  }
];

// Función para actualizar una unidad por ID
export const updateUnidad = [
  // Validaciones
  body('modelo').notEmpty().withMessage('El modelo es obligatorio.'),
  body('marca').notEmpty().withMessage('La marca es obligatoria.'),
  body('año').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('El año debe ser un número válido entre 1900 y el año actual.'),
  body('placa').notEmpty().withMessage('La placa es obligatoria.')
    .matches(/^[A-Z0-9]{1,10}$/).withMessage('La placa debe contener solo letras mayúsculas y números (máximo 10 caracteres).'),
  body('estado').isIn(['activo', 'inactivo']).withMessage('El estado debe ser "activo" o "inactivo".'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id_unidad } = req.params;
    const { modelo, marca, año, placa, estado } = req.body;

    try {
      const result = await unidadModel.updateUnidad(id_unidad, { modelo, marca, año, placa, estado });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Unidad no encontrada.' });
      }
      res.status(200).json({ message: 'Unidad actualizada exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la unidad.' });
    }
  }
];

// Obtener todas las unidades
export const getAllUnidades = async (req, res) => {
  try {
    const unidades = await unidadModel.getAllUnidades();
    res.status(200).json(unidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las unidades.' });
  }
};

// Obtener una unidad por ID
export const getUnidadById = async (req, res) => {
  const { id_unidad } = req.params;
  try {
    const unidad = await unidadModel.getUnidadById(id_unidad);
    if (!unidad) {
      return res.status(404).json({ message: 'Unidad no encontrada.' });
    }
    res.status(200).json(unidad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la unidad.' });
  }
};

// Eliminar una unidad por ID
export const deleteUnidad = async (req, res) => {
  const { id_unidad } = req.params;
  try {
    const result = await unidadModel.deleteUnidad(id_unidad);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Unidad no encontrada.' });
    }
    res.status(200).json({ message: 'Unidad eliminada exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la unidad.' });
  }
};
