// src/models/averiaModel.js
import pool from '../config/db.js';

export const createAveria = async ({ tipo_averia, descripcion }) => {
  const query = `
    INSERT INTO Averias (tipo_averia, descripcion)
    VALUES (?, ?)
  `;
  const values = [tipo_averia, descripcion];
  const [result] = await pool.query(query, values);
  return result;
};

export const updateAveria = async (id_averia, { tipo_averia, descripcion }) => {
  const query = `
    UPDATE Averias 
    SET tipo_averia = ?, descripcion = ? 
    WHERE id_averias = ?
  `;
  const values = [tipo_averia, descripcion, id_averia];
  const [result] = await pool.query(query, values);
  return result;
};

export const getAllAverias = async () => {
  const query = 'SELECT * FROM Averias';
  const [rows] = await pool.query(query);
  return rows;
};

export const getAveriaById = async (id_averia) => {
  const query = 'SELECT * FROM Averias WHERE id_averias = ?';
  const [rows] = await pool.query(query, [id_averia]);
  return rows[0];
};

export const deleteAveria = async (id_averia) => {
  const query = 'DELETE FROM Averias WHERE id_averias = ?';
  const [result] = await pool.query(query, [id_averia]);
  return result;
};
