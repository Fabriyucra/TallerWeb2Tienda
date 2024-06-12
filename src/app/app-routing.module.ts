import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { CardproductosComponent } from "./cardproductos/cardproductos.component";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component'
import { ConfirmComponent } from './confirm/confirm.component';


const routes : Routes = [
    { path: 'card', component: CardproductosComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'confirm', component: ConfirmComponent },
    // Puedes agregar otras rutas aquí
    { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirigir a login por defecto
  
]
@NgModule({
    imports :[RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class AppRoutingModule{}