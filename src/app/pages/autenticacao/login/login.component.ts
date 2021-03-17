import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  logo: String = 'logo.png';
  showToastErro: boolean = false;
  mensagemErro: String = '';
  constructor(
    private autenticacaoService: AutenticacaoService,
    private formBuilder: FormBuilder,
    private rota: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['',
        Validators.compose([
          Validators.minLength(1),
          Validators.required
        ])
      ],
      password: ['', Validators.compose([
        Validators.minLength(1),
        Validators.required
      ])]
    });
  }

  ngOnInit(): void {
    if (this.autenticacaoService.verificarUsuarioLogado()) {
      this.rota.navigate(['home']);
    }
  }

  submit(){
    let username: string = this.loginForm.get('username')?.value;
    let password: string = this.loginForm.get('password')?.value;
    this.autenticacaoService.login(username,password).subscribe((data:any) => {
      if (data.success) {
        this.showToastErro = false;
        localStorage.setItem('usuarioLogado', 'true');
        this.rota.navigate(['home']);  
      } else {
        this.showToastErro = true;
        this.mensagemErro = data.error;
      }
    }, (err) => {
        this.showToastErro = true;
        this.mensagemErro = err;
    });
  }
}