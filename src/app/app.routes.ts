import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ReportesAveriasComponent } from './features/reportes-averias/reportes-averias.component';
import { VerReportesComponent } from './features/ver-reportes/ver-reportes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reportes-averias', component: ReportesAveriasComponent },
  { path: 'ver-reportes', component: VerReportesComponent }, // Nueva pantalla de reportes
];
