import pool from '../config/db.js';

export const createReporte = async ({ id_usuario, unidad, imagen_averia, tipo_averia, estado }) => {
  const query = `
    INSERT INTO Reporte (id_usuario, unidad, imagen_averia, tipo_averia, estado)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [id_usuario, unidad, imagen_averia, tipo_averia, estado];
  const [result] = await pool.query(query, values);
  return result;
};

export const updateReporte = async (id_reporte, { id_usuario, unidad, imagen_averia, tipo_averia, estado }) => {
  const query = `
    UPDATE Reporte
    SET id_usuario = ?, unidad = ?, imagen_averia = ?, tipo_averia = ?, estado = ?
    WHERE id_reporte = ?
  `;
  const values = [id_usuario, unidad, imagen_averia, tipo_averia, estado, id_reporte];
  const [result] = await pool.query(query, values);
  return result;
};

export const getAllReportes = async () => {
  const query = 'SELECT * FROM Reporte';
  const [rows] = await pool.query(query);
  return rows;
};

export const getReporteById = async (id_reporte) => {
  const query = 'SELECT * FROM Reporte WHERE id_reporte = ?';
  const [rows] = await pool.query(query, [id_reporte]);
  return rows[0];
};

export const deleteReporte = async (id_reporte) => {
  const query = 'DELETE FROM Reporte WHERE id_reporte = ?';
  const [result] = await pool.query(query, [id_reporte]);
  return result;
};
