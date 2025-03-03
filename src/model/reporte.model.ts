// src/model/reporte.model.ts
export interface Reporte {
  id_usuario: number;
  fecha_reporte?: string; // Ahora es opcional
  unidad: number;
  imagen_averia?: string;
  tipo_averia: string;
  estado: string;
}
