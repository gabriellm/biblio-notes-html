import { ClienteModel } from '../model/cliente-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/domain/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url = 'http://localhost:8080/cliente/';

  constructor(private http: HttpClient) {}

  cadastrar(model: ClienteModel): Observable<Cliente> {
    return this.http.post<Cliente>(this.url + 'cadastrar', model);
  }

  alterar(id: string, model: ClienteModel): Observable<Cliente> {
    return this.http.put<Cliente>(this.url + 'alterar/' + id, model);
  }

  consultar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url + 'consultar');
  }

  ordenarPorNome(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url + 'ordenarNome');
  }

  ordenarPorAniver(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url + 'ordenarAniver');
  }

  remover(id: string): Observable<Cliente> {
    return this.http.delete<Cliente>(this.url + 'remover/' + id);
  }
}
