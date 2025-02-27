// src/models/unidadModel.js
import pool from '../config/db.js';

export const createUnidad = async ({ modelo, marca, año, placa, estado }) => {
  const query = `
    INSERT INTO Unidad (modelo, marca, año, placa, estado)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [modelo, marca, año, placa, estado];
  const [result] = await pool.query(query, values);
  return result;
};

export const updateUnidad = async (id_unidad, { modelo, marca, año, placa, estado }) => {
  const query = `
    UPDATE Unidad 
    SET modelo = ?, marca = ?, año = ?, placa = ?, estado = ? 
    WHERE id_unidad = ?
  `;
  const values = [modelo, marca, año, placa, estado, id_unidad];
  const [result] = await pool.query(query, values);
  return result;
};

export const getAllUnidades = async () => {
  const query = 'SELECT * FROM Unidad';
  const [rows] = await pool.query(query);
  return rows;
};

export const getUnidadById = async (id_unidad) => {
  const query = 'SELECT * FROM Unidad WHERE id_unidad = ?';
  const [rows] = await pool.query(query, [id_unidad]);
  return rows[0];
};

export const deleteUnidad = async (id_unidad) => {
  const query = 'DELETE FROM Unidad WHERE id_unidad = ?';
  const [result] = await pool.query(query, [id_unidad]);
  return result;
};
