import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './models/productos';
import { CardProductosService } from './cardproductos.service';

@Component({
  selector: 'app-cardproductos',
  templateUrl: './cardproductos.component.html',
  styleUrls: ['./cardproductos.component.css']
})
export class CardproductosComponent {

  productos$ :Observable<Producto[]>;

  constructor(private productosServicio : CardProductosService

  ){
    this.productos$ = this.productosServicio.getProductos();
  }
}
