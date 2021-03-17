import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AutenticacaoService {
  constructor(private http: HttpClient,private rota: Router) { }
  
  login(username:string, password:string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    };
    return this.http.post(`${environment.SITEMERCADO_BASE_URL}/login`, null, httpOptions);
  }
  
  logout() {
    localStorage.setItem('usuarioLogado', 'false');
    this.rota.navigate(['login']);
  }

  verificarUsuarioLogado(): boolean {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    return usuarioLogado == 'true';
  }
}
