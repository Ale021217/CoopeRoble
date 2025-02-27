// src/models/reparacionModel.js
import pool from '../config/db.js';

export const createReparacion = async ({ id_reporte, id_usuario, fecha_entrada, fecha_salida, descripcion_reparacion, imagen_reparacion, falla_adicional }) => {
  try {
    const [result] = await pool.query(
      `INSERT INTO Reparaciones (id_reporte, id_usuario, fecha_entrada, fecha_salida, descripcion_reparacion, imagen_reparacion, falla_adicional)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id_reporte, id_usuario, fecha_entrada, fecha_salida, descripcion_reparacion, imagen_reparacion, falla_adicional]
    );
    return result;
  } catch (error) {
    throw new Error('Error al crear la reparación: ' + error.message);
  }
};

export const getAllReparaciones = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM Reparaciones');
    return rows;
  } catch (error) {
    throw new Error('Error al obtener reparaciones: ' + error.message);
  }
};

export const getReparacionById = async (id_reparacion) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Reparaciones WHERE id_reparaciones = ?', [id_reparacion]);
    return rows[0];
  } catch (error) {
    throw new Error('Error al obtener la reparación: ' + error.message);
  }
};

export const updateReparacion = async (id_reparacion, { fecha_entrada, fecha_salida, descripcion_reparacion, imagen_reparacion, falla_adicional }) => {
  try {
    const [result] = await pool.query(
      `UPDATE Reparaciones SET fecha_entrada = ?, fecha_salida = ?, descripcion_reparacion = ?, imagen_reparacion = ?, falla_adicional = ?
       WHERE id_reparaciones = ?`,
      [fecha_entrada, fecha_salida, descripcion_reparacion, imagen_reparacion, falla_adicional, id_reparacion]
    );
    return result;
  } catch (error) {
    throw new Error('Error al actualizar la reparación: ' + error.message);
  }
};

export const deleteReparacion = async (id_reparacion) => {
  try {
    const [result] = await pool.query('DELETE FROM Reparaciones WHERE id_reparaciones = ?', [id_reparacion]);
    return result;
  } catch (error) {
    throw new Error('Error al eliminar la reparación: ' + error.message);
  }
};
