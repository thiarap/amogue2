import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../servicios/product.service';
import { CarritoService } from '../../servicios/carrito.service';
import { Producto } from '../../modelos/producto.model';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  producto: Producto[] = [];
  cargando = true;
  error = '';

  constructor(
    private productService: ProductService,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  // ===================================================
  // Cargar productos desde el backend
  // ===================================================
  cargarProductos(): void {
    this.productService.obtenerProductos().subscribe({
      next: (res: any) => {
        this.producto = res;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar productos:', err);
        this.error = 'No se pudieron cargar los productos.';
        this.cargando = false;
      }
    });
  }

  // ===================================================
  // Método para agregar un producto al carrito
  // ===================================================

  agregarAlCarrito(producto:Producto): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }

    this.carritoService.agregarACarrito(producto).subscribe({
      next: () => {
        alert(`Producto "${this.producto}" agregado al carrito ✅`);
      },
      error: (err: any) => {
        console.error('Error agregando al carrito:', err);
        if (err.status === 403) {
          alert('No autorizado. Por favor inicia sesión de nuevo.');
        } else {
          alert('No se pudo agregar el producto. Intenta más tarde.');
        }
      }
    });
  }


}
