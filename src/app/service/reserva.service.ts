import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Reserva } from '../domain/reserva';
import { ReservaModel } from '../model/reserva-model';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private url = 'http://localhost:8080/reserva/';

  constructor(private http: HttpClient) {}

  reservar(model: ReservaModel): Observable<Reserva> {
    return this.http.post<Reserva>(this.url + 'reservar', model);
  }

  alterar(id: string, model: ReservaModel): Observable<Reserva> {
    return this.http.put<Reserva>(this.url + 'alterar/' + id, model);
  }

  consultar(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.url + 'consultar');
  }

  remover(id: string): Observable<Reserva> {
    return this.http.delete<Reserva>(this.url + 'remover/' + id);
  }
}
