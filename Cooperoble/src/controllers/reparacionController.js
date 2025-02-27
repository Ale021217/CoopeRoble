// src/controllers/reparacionController.js
import * as reparacionModel from '../models/reparacionModel.js';

export const createReparacion = async (req, res) => {
  const { id_reporte, id_usuario, fecha_entrada, fecha_salida, descripcion_reparacion, imagen_reparacion, falla_adicional } = req.body;

  // Validación de los campos necesarios
  if (!id_reporte || !id_usuario || !fecha_entrada || !fecha_salida || !descripcion_reparacion) {
    return res.status(400).json({ message: 'Faltan campos requeridos.' });
  }

  // Validación para el campo de imagen (puede ser null)
  if (imagen_reparacion && typeof imagen_reparacion !== 'string') {
    return res.status(400).json({ message: 'La URL de la imagen debe ser una cadena de texto válida.' });
  }

  try {
    const result = await reparacionModel.createReparacion({ 
      id_reporte, 
      id_usuario, 
      fecha_entrada, 
      fecha_salida, 
      descripcion_reparacion, 
      imagen_reparacion, 
      falla_adicional 
    });
    res.status(201).json({ message: 'Reparación creada exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la reparación.' });
  }
};

export const getAllReparaciones = async (req, res) => {
  try {
    const reparaciones = await reparacionModel.getAllReparaciones();
    res.status(200).json(reparaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las reparaciones.' });
  }
};

export const getReparacionById = async (req, res) => {
  const { id_reparacion } = req.params;
  try {
    const reparacion = await reparacionModel.getReparacionById(id_reparacion);
    if (reparacion) {
      res.status(200).json(reparacion);
    } else {
      res.status(404).json({ message: 'Reparación no encontrada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la reparación.' });
  }
};

export const updateReparacion = async (req, res) => {
  const { id_reparacion } = req.params;
  const { fecha_entrada, fecha_salida, descripcion_reparacion, imagen_reparacion, falla_adicional } = req.body;

  // Validación de los campos requeridos para actualizar
  if (!fecha_entrada || !fecha_salida || !descripcion_reparacion) {
    return res.status(400).json({ message: 'Faltan campos requeridos.' });
  }

  // Validación para el campo de imagen (puede ser null)
  if (imagen_reparacion && typeof imagen_reparacion !== 'string') {
    return res.status(400).json({ message: 'La URL de la imagen debe ser una cadena de texto válida.' });
  }

  try {
    const result = await reparacionModel.updateReparacion(id_reparacion, { 
      fecha_entrada, 
      fecha_salida, 
      descripcion_reparacion, 
      imagen_reparacion, 
      falla_adicional 
    });

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Reparación actualizada exitosamente.' });
    } else {
      res.status(404).json({ message: 'Reparación no encontrada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la reparación.' });
  }
};

export const deleteReparacion = async (req, res) => {
  const { id_reparacion } = req.params;
  try {
    const result = await reparacionModel.deleteReparacion(id_reparacion);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Reparación eliminada exitosamente.' });
    } else {
      res.status(404).json({ message: 'Reparación no encontrada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la reparación.' });
  }
};
