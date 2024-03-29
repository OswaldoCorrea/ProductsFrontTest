import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../models/produto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private http: HttpClient) { }
  private readonly urlProdutos = '/products';

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${environment.API_BASE_URL}${this.urlProdutos}`);
  }

  criar(data:Produto): Observable<Produto[]>{
    return this.http.post<Produto[]>(`${environment.API_BASE_URL}${this.urlProdutos}`, data);
  }

  atualizar(data:Produto): Observable<Produto[]>{
    return this.http.put<Produto[]>(`${environment.API_BASE_URL}${this.urlProdutos}`, data);
  }

  excluir(id:string): Observable<Produto[]>{
    return this.http.delete<Produto[]>(`${environment.API_BASE_URL}${this.urlProdutos}/${id}`);
  }
}