// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Importa las rutas (verifica que los nombres de archivo sean correctos)
import usuarioRoutes from './src/routes/usuarioRoutes.js';
import unidadRoutes from './src/routes/unidadRoutes.js';
import averiaRoutes from './src/routes/averiaRoutes.js';
import reporteRoutes from './src/routes/reporteRoutes.js';
import reparacionesRoutes from './src/routes/reparaciones.Route.js';

// Cargar variables de entorno
dotenv.config({ path: path.join(process.cwd(), '.env') });

const app = express();

// Para poder usar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/unidad', unidadRoutes);
app.use('/api/averia', averiaRoutes);
app.use('/api/reporte', reporteRoutes);
app.use('/api/reparaciones', reparacionesRoutes);

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);


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
