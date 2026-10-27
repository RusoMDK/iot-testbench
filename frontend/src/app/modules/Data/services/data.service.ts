/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataS } from '../Components/interface/data.interface';



import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = `${environment.apiUrl}data-sensor`;

  constructor(private http: HttpClient) {}

  get(): Observable<DataS[]> {
    return this.http.get<DataS[]>(`${this.apiUrl}`);
  }
  create(dataCreate:DataS): Observable<DataS> {
    return this.http.post<DataS>(`${this.apiUrl}`, dataCreate);
  }
  update(id:number,updateDataDto:DataS): Observable<DataS> {
    return this.http.patch<DataS>(`${this.apiUrl}/${id}`, updateDataDto);
  }

  delete(id:number): Observable<DataS> {
    return this.http.delete<DataS>(`${this.apiUrl}/${id}`);
  }
  subscribeToTopic(): Observable<string> {
    return this.http.get<string>(`${environment.apiUrl}mqtt/subscribe`);
  }

  getAllStoredData(): Observable<DataS[]> {
    return this.http.get<DataS[]>(`${this.apiUrl}/all`);
  }

  getDataByDay(day: Date): Observable<DataS[]> {
    return this.http.get<DataS[]>(`${this.apiUrl}/by_day?day=${day}`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error al obtener datos:', error);
    return throwError('Ocurrió un error al obtener los datos; por favor, inténtelo de nuevo más tarde.');
  }
}