import pool from '../config/db.js';

// Obtener todos los usuarios
export const getAllUsuarios = async () => {
  const [rows] = await pool.query('SELECT * FROM Usuarios');
  return rows;
};

// Obtener un usuario por ID
export const getUsuarioById = async (id_usuario) => {
  const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id_usuario]);
  return rows[0];
};

// Crear un nuevo usuario
export const createUsuario = async (nombre, correo, contraseña, rol) => {
  const [result] = await pool.query(
    'INSERT INTO Usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)',
    [nombre, correo, contraseña, rol]
  );
  return result.insertId;
};

// Actualizar un usuario
export const updateUsuario = async (id_usuario, nombre, correo, contraseña, rol) => {
  const [result] = await pool.query(
    'UPDATE Usuarios SET nombre = ?, correo = ?, contraseña = ?, rol = ? WHERE id_usuario = ?',
    [nombre, correo, contraseña, rol, id_usuario]
  );
  return result.affectedRows;
};

// Eliminar un usuario
export const deleteUsuario = async (id_usuario) => {
  const [result] = await pool.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id_usuario]);
  return result.affectedRows;
};
