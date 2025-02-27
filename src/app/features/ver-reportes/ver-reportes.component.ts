import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Interfaz para el Reporte
interface Reporte {
  id?: number;
  fecha: Date;
  unidad: string;
  tipoAveria: string;
  descripcion: string;
  foto: string;
  estado?: string;
}

@Component({
  selector: 'app-ver-reportes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [DatePipe],
  templateUrl: './ver-reportes.component.html',
  styleUrls: ['./ver-reportes.component.css']
})
export class VerReportesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedRow: Reporte | null = null;

  // Datos de ejemplo
  reportes: Reporte[] = [
    { 
      id: 1,
      fecha: new Date(), 
      unidad: 'Unidad A-123', 
      tipoAveria: 'Mecánica', 
      descripcion: 'Problema con el motor. Se detectó ruido anormal durante la operación.', 
      foto: 'assets/averia1.jpg',
      estado: 'Pendiente'
    },
    { 
      id: 2,
      fecha: new Date(Date.now() - 86400000), // Ayer
      unidad: 'Unidad B-456', 
      tipoAveria: 'Eléctrica', 
      descripcion: 'Fallo en el sistema eléctrico. Luces intermitentes y pérdida de energía.', 
      foto: 'assets/averia2.jpg',
      estado: 'En proceso'
    },
    { 
      id: 3,
      fecha: new Date(Date.now() - 172800000), // Hace 2 días
      unidad: 'Unidad C-789', 
      tipoAveria: 'Hidráulica', 
      descripcion: 'Pérdida de presión hidráulica en el sistema de frenos.', 
      foto: '',
      estado: 'Pendiente'
    },
    { 
      id: 4,
      fecha: new Date(Date.now() - 259200000), // Hace 3 días
      unidad: 'Unidad D-101', 
      tipoAveria: 'Mecánica', 
      descripcion: 'Desgaste excesivo en los neumáticos traseros.', 
      foto: 'assets/averia3.jpg',
      estado: 'Pendiente'
    },
    { 
      id: 5,
      fecha: new Date(Date.now() - 345600000), // Hace 4 días
      unidad: 'Unidad E-202', 
      tipoAveria: 'Eléctrica', 
      descripcion: 'Panel de control no responde. Necesita revisión urgente.', 
      foto: 'assets/averia4.jpg',
      estado: 'En proceso'
    },
  ];

  dataSource = new MatTableDataSource<Reporte>(this.reportes);
  displayedColumns: string[] = ['fecha', 'unidad', 'tipoAveria', 'descripcion', 'foto', 'acciones'];

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    // Personalizar la función de filtrado
    this.dataSource.filterPredicate = (data: Reporte, filter: string) => {
      const searchText = filter.toLowerCase();
      return data.unidad.toLowerCase().includes(searchText) || 
             data.tipoAveria.toLowerCase().includes(searchText) || 
             data.descripcion.toLowerCase().includes(searchText);
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectRow(row: Reporte): void {
    this.selectedRow = this.selectedRow === row ? null : row;
  }

  openDialog(element: Reporte): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '700px',
      maxHeight: '90vh',
      data: element,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.action === 'asignar') {
          this.asignarseReporte(result.data);
        } else if (result.action === 'responder') {
          this.responderReporte(result.data);
        }
      }
    });
  }

  getBadgeClass(tipoAveria: string): string {
    const tipo = tipoAveria.toLowerCase();
    if (tipo.includes('mecan')) return 'badge-mechanical';
    if (tipo.includes('electr')) return 'badge-electrical';
    if (tipo.includes('hidrau')) return 'badge-hydraulic';
    return 'badge-other';
  }

  asignarseReporte(element: Reporte): void {
    // Lógica para asignar el reporte
    element.estado = 'En proceso';
    this.snackBar.open(`Reporte de la unidad ${element.unidad} asignado correctamente`, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar']
    });
  }

  responderReporte(element: Reporte): void {
    // Lógica para responder al reporte
    this.snackBar.open(`Respondiendo al reporte de la unidad ${element.unidad}`, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['info-snackbar']
    });
    
    // Aquí se podría abrir otro diálogo para la respuesta
    // this.dialog.open(ResponderReporteDialog, {
    //   width: '600px',
    //   data: element
    // });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  providers: [DatePipe],
  template: `
    <div class="dialog-container">
      <!-- Cabecera -->
      <div class="dialog-header">
        <h1 class="dialog-title">Detalles del Reporte</h1>
        <button mat-icon-button class="close-button" (click)="onNoClick()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <!-- Contenido -->
      <div mat-dialog-content class="dialog-content">
        <div class="detail-grid">
          <!-- Columna izquierda - Información -->
          <div class="detail-info">
            <div class="info-section">
              <div class="info-item">
                <div class="info-label">
                  <mat-icon>calendar_today</mat-icon>
                  <span>Fecha:</span>
                </div>
                <div class="info-value">{{ data.fecha | date: 'dd/MM/yyyy HH:mm' }}</div>
              </div>
              
              <div class="info-item">
                <div class="info-label">
                  <mat-icon>directions_bus</mat-icon>
                  <span>Unidad:</span>
                </div>
                <div class="info-value">{{ data.unidad }}</div>
              </div>
              
              <div class="info-item">
                <div class="info-label">
                  <mat-icon>build</mat-icon>
                  <span>Tipo de Avería:</span>
                </div>
                <div class="info-value">
                  <span class="badge" [ngClass]="getBadgeClass(data.tipoAveria)">
                    {{ data.tipoAveria }}
                  </span>
                </div>
              </div>
              
              <div class="info-item description-item">
                <div class="info-label">
                  <mat-icon>description</mat-icon>
                  <span>Descripción:</span>
                </div>
                <div class="info-value">{{ data.descripcion }}</div>
              </div>
            </div>
          </div>
          
          <!-- Columna derecha - Foto -->
          <div class="detail-photo">
            <h3 class="photo-title">
              <mat-icon>photo_camera</mat-icon>
              <span>Fotografía</span>
            </h3>
            
            <div class="photo-container" *ngIf="data.foto; else noPhoto">
              <img [src]="data.foto" alt="Foto del reporte" class="detail-image">
            </div>
            
            <ng-template #noPhoto>
              <div class="no-photo-container">
                <mat-icon>no_photography</mat-icon>
                <p>No hay fotografía disponible</p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div mat-dialog-actions class="dialog-actions">
        <button mat-button (click)="onNoClick()" color="basic">Cancelar</button>
        <button mat-raised-button color="primary" (click)="onAsignar()">
          <mat-icon>assignment_ind</mat-icon>
          Asignar
        </button>
        <button mat-raised-button color="accent" (click)="onResponder()">
          <mat-icon>comment</mat-icon>
          Responder
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      display: flex;
      flex-direction: column;
      max-height: 100%;
    }
    
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid #e0e0e0;
      background-color: #5f249f;
      color: white;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    
    .dialog-title {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
    }
    
    .close-button {
      color: white;
    }
    
    .dialog-content {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }
    
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    
    .info-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .info-label {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      font-weight: 500;
    }
    
    .info-value {
      font-size: 16px;
      padding-left: 32px;
    }
    
    .description-item .info-value {
      background-color: #f5f5f5;
      padding: 12px 16px 12px 32px;
      border-radius: 4px;
      border-left: 4px solid #5f249f;
    }
    
    .detail-photo {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .photo-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      color: #5f249f;
      align-self: flex-start;
    }
    
    .photo-container {
      display: flex;
      justify-content: center;
      width: 100%;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .detail-image {
      width: 100%;
      max-height: 300px;
      object-fit: contain;
    }
    
    .no-photo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
      border-radius: 8px;
      padding: 48px 24px;
      width: 100%;
      height: 300px;
    }
    
    .no-photo-container mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      color: #9e9e9e;
      margin-bottom: 16px;
    }
    
    .no-photo-container p {
      color: #9e9e9e;
      font-style: italic;
    }
    
    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      color: white;
      display: inline-block;
    }
    
    .badge-mechanical {
      background-color: #ff7043;
    }
    
    .badge-electrical {
      background-color: #2196f3;
    }
    
    .badge-hydraulic {
      background-color: #9c27b0;
    }
    
    .badge-other {
      background-color: #607d8b;
    }
    
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 12px 24px;
      border-top: 1px solid #e0e0e0;
    }
    
    @media (max-width: 768px) {
      .detail-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onAsignar(): void {
    this.dialogRef.close({ action: 'asignar', data: this.data });
  }
  
  onResponder(): void {
    this.dialogRef.close({ action: 'responder', data: this.data });
  }
  
  getBadgeClass(tipoAveria: string): string {
    const tipo = tipoAveria.toLowerCase();
    if (tipo.includes('mecan')) return 'badge-mechanical';
    if (tipo.includes('electr')) return 'badge-electrical';
    if (tipo.includes('hidrau')) return 'badge-hydraulic';
    return 'badge-other';
  }
}