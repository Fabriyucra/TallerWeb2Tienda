import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { CardproductosComponent } from "./cardproductos/cardproductos.component";


const routes : Routes = [
    {
        path: '',
        component: CardproductosComponent
    }
]
@NgModule({
    imports :[RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class AppRoutingModule{}