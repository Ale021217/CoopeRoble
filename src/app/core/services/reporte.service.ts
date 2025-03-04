import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reporte } from '../model/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'http://localhost:3000/api/reporte';

  constructor(private http: HttpClient) {}

  createReporte(reporte: Reporte): Observable<any> {
    return this.http.post<any>(this.apiUrl, reporte);
  }
}
