import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'; // Para manejar rutas de archivos
import usuarioRoutes from './src/routes/usuarioRoutes.js';
import unidadRoutes from './src/routes/unidadRoutes.js';
import averiaRoutes from './src/routes/averiaRoutes.js';
import reporteRoutes from './src/routes/reporteRoutes.js';
import reparacionesRoutes from './src/routes/reparaciones.Route.js';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para leer JSON en las solicitudes

// Rutas API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/unidad', unidadRoutes);
app.use('/api/averia', averiaRoutes);
app.use('/api/reporte', reporteRoutes);
app.use('/api/reparaciones', reparacionesRoutes);

// Servir el frontend en producción
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Si no hay ninguna ruta API, servir el frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
