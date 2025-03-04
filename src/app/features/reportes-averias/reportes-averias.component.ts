import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReporteService } from '../../core/services/reporte.service';

// Interfaz para la avería
interface Averia {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-reportes-averias',
  standalone: true,
  // Si usas el enfoque global (provideHttpClient en main.ts), no incluyas HttpClientModule aquí;
  // si prefieres importarlo localmente, agrégalo en el array imports.
  imports: [ReactiveFormsModule, CommonModule],
  providers: [FormBuilder],
  templateUrl: './reportes-averias.component.html',
  styleUrls: ['./reportes-averias.component.css']
})
export class ReportesAveriasComponent implements OnInit {
  reporteForm!: FormGroup;
  averias: Averia[] = [];
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private reporteService: ReporteService,
    private http: HttpClient // para obtener la lista de averías
  ) {}

  ngOnInit(): void {
    // Inicializa el formulario sin campo de fecha_reporte (se asigna automáticamente en la BD)
    this.reporteForm = this.fb.group({
      unidad: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      imagen_averia: ['', Validators.pattern('https?://.+')],
      // 'tipo_averia' se asignará mediante un select basado en las averías disponibles
      tipo_averia: [null, Validators.required],
      estado: ['', Validators.required]
    });

    // Carga la lista de averías desde el backend
    this.cargarAverias();
  }

  // Método para obtener las averías existentes desde el endpoint
  cargarAverias(): void {
    // Ajusta la URL si es necesario
    this.http.get<Averia[]>('http://localhost:3000/api/averia')
      .subscribe({
        next: (data) => {
          this.averias = data;
          console.log('Averías recibidas:', this.averias);
        },
        error: (err) => {
          console.error('Error al cargar averías:', err);
          this.errorMessage = 'No se pudieron cargar las averías.';
        }
      });
  }

  // Getter para facilitar el acceso a los controles del formulario
  get f() {
    return this.reporteForm.controls;
  }

  onSubmit(): void {
    if (this.reporteForm.invalid) {
      this.reporteForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Se asigna un id_usuario fijo; en un entorno real se tomaría del usuario autenticado
    const id_usuario = 1;
    const reporte = {
      id_usuario,
      unidad: parseInt(this.f['unidad'].value),
      imagen_averia: this.f['imagen_averia'].value || null,
      tipo_averia: this.f['tipo_averia'].value,
      estado: this.f['estado'].value
    };

    this.reporteService.createReporte(reporte).subscribe({
      next: () => {
        this.successMessage = 'Reporte creado exitosamente.';
        this.reporteForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Error al crear el reporte:', err);
        this.errorMessage = 'Error al crear el reporte. Inténtalo de nuevo.';
        this.isSubmitting = false;
      }
    });
  }
}
