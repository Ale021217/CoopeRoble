import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

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
  ],
  providers: [DatePipe],
  templateUrl: './ver-reportes.component.html',
  styleUrls: ['./ver-reportes.component.css']
})
export class VerReportesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource([
    { fecha: new Date(), unidad: 'Unidad A', tipoAveria: 'Mecánica', descripcion: 'Problema con el motor.', foto: 'assets/averia.jpg' },
    { fecha: new Date(), unidad: 'Unidad B', tipoAveria: 'Eléctrica', descripcion: 'Fallo en el sistema eléctrico.', foto: 'https://www.example.com/imagen2.jpg' },
    { fecha: new Date(), unidad: 'Unidad C', tipoAveria: 'Hidráulica', descripcion: 'Pérdida de presión hidráulica.', foto: '' },
  ]);

  displayedColumns: string[] = ['fecha', 'unidad', 'tipoAveria', 'descripcion', 'foto', 'acciones'];

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(element: any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '80%',
      height: '70%',
    
      data: element
    });
  }
  

  asignarseReporte(element: any): void {
    console.log('Asignado el reporte:', element);
  }

  responderReporte(element: any): void {
    console.log('Respondiendo al reporte:', element);
  }

  constructor(public dialog: MatDialog) {}
}

@Component({
  selector: 'dialog-overview-example-dialog',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  template: `
    <h1 mat-dialog-title>Detalles del Reporte</h1>

    <div mat-dialog-content>
      <p><strong>Fecha:</strong> {{ data.fecha | date: 'short' }}</p>
      <p><strong>Unidad:</strong> {{ data.unidad }}</p>
      <p><strong>Tipo de Avería:</strong> {{ data.tipoAveria }}</p>
      <p><strong>Descripción:</strong> {{ data.descripcion }}</p>
      <p><strong>Foto:</strong> 
        <img *ngIf="data.foto" [src]="data.foto" alt="Foto del reporte" class="report-image">
        <span *ngIf="!data.foto">No disponible</span>
      </p>
    </div>

    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cerrar</button>
    </div>
  `
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
}
