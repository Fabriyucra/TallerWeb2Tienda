import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { Producto } from "./models/productos";

@Injectable({
    providedIn: 'root'
})
export class CardProductosService{

    private jsonUrl = 'assets/db.json';

    constructor(private httpClient : HttpClient){}

    getProductos(): Observable <Producto[]>{
        return this.httpClient.get<Producto[]>(this.jsonUrl)
    }
}