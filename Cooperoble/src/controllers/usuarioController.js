import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import { body, validationResult } from 'express-validator';

// Función para registrar un nuevo usuario
export const signup = [
  // Validaciones
  body('nombre').notEmpty().withMessage('El nombre es obligatorio.'),
  body('correo').isEmail().withMessage('El correo no es válido.'),
  body('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
  body('rol').isIn(['admin', 'user']).withMessage('El rol debe ser "admin" o "user".'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, correo, contraseña, rol } = req.body;

    try {
      // Comprobar si el usuario ya existe
      const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
      if (rows.length > 0) {
        return res.status(400).json({ message: 'El correo ya está registrado.' });
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(contraseña, 10);

      // Insertar el nuevo usuario en la base de datos
      await pool.query('INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)', 
        [nombre, correo, hashedPassword, rol]);

      res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor.' });
    }
  }
];

// Función para iniciar sesión de un usuario
export const login = [
  // Validaciones
  body('correo').isEmail().withMessage('El correo no es válido.'),
  body('contraseña').notEmpty().withMessage('La contraseña es obligatoria.'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { correo, contraseña } = req.body;

    try {
      // Buscar el usuario en la base de datos
      const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

      if (rows.length === 0) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
      }

      const usuario = rows[0];

      // Comparar la contraseña ingresada con la encriptada
      const passwordMatch = await bcrypt.compare(contraseña, usuario.contraseña);

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos.' });
      }

      // Aquí puedes generar un token JWT o iniciar una sesión si es necesario
      // Si deseas usar JWT, te puedo ayudar a configurarlo

      res.status(200).json({ message: 'Inicio de sesión exitoso.', usuario });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor.' });
    }
  }
];

// Obtener todos los usuarios
export const getAllUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios.' });
  }
};

// Obtener un usuario por ID
export const getUsuarioById = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario.' });
  }
};

// Actualizar un usuario por ID
export const updateUsuario = [
  // Validaciones
  body('nombre').notEmpty().withMessage('El nombre es obligatorio.'),
  body('correo').isEmail().withMessage('El correo no es válido.'),
  body('rol').isIn(['admin', 'user']).withMessage('El rol debe ser "admin" o "user".'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id_usuario } = req.params;
    const { nombre, correo, contraseña, rol } = req.body;

    try {
      // Encriptar la contraseña si se proporciona
      let hashedPassword = contraseña ? await bcrypt.hash(contraseña, 10) : undefined;

      // Actualizar usuario
      const [result] = await pool.query(
        'UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ?, rol = ? WHERE id_usuario = ?',
        [nombre, correo, hashedPassword || null, rol, id_usuario]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      res.status(200).json({ message: 'Usuario actualizado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el usuario.' });
    }
  }
];

// Eliminar un usuario por ID
export const deleteUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario.' });
  }
};
