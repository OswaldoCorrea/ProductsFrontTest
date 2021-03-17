import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../autenticacao/services/autenticacao.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService, private rota: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.autenticacaoService.logout();
  }
}
