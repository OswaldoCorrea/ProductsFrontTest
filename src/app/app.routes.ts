import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/autenticacao/login/login.component";
import { HomeComponent } from "./pages/home/home/home.component";
import { ProdutosComponent } from "./pages/produtos/produtos.component";

export const rootRouterConfig: Routes = [
    { path:'', redirectTo:'/login', pathMatch: 'full'},
    { path:'login', component: LoginComponent},
    { path:'home', component: HomeComponent},
    { path:'produtos', component: ProdutosComponent}
];