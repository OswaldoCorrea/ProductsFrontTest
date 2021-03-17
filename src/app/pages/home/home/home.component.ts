import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../autenticacao/services/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService, private rota: Router) { }

  ngOnInit(): void {
    if (!this.autenticacaoService.verificarUsuarioLogado()) {
      this.rota.navigate(['login']);
    }
  }

}
