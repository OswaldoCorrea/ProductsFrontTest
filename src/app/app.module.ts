import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import  localePt  from '@angular/common/locales/pt';
registerLocaleData(localePt);


import { AppComponent } from './app.component';
import { rootRouterConfig } from './app.routes';
import { LoginComponent } from './pages/autenticacao/login/login.component';
import { NavbarComponent } from './pages/home/navbar/navbar.component';
import { MenuLateralComponent } from './pages/home/menu-lateral/menu-lateral.component';
import { HomeComponent } from './pages/home/home/home.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ListaProdutosComponent } from './pages/produtos/lista-produtos/lista-produtos.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { HttpClientModule } from '@angular/common/http';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { AuthGuardGuard } from './pages/autenticacao/services/auth-guard.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MenuLateralComponent,
    HomeComponent,
    ProdutosComponent,
    ListaProdutosComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgxCurrencyModule,
    HttpClientModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    [RouterModule.forRoot(rootRouterConfig, {useHash:false})]
  ],
  providers: [{
    provide: APP_BASE_HREF, useValue: '/'}, 
    AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
