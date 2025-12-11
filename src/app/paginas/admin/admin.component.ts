import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../servicios/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  productos: any[] = [];
  formulario!: FormGroup;
  editando = false;
  idEditando: number | null = null;
  imagenArchivo: File | null = null;
  imagenPrevia: string | null = null;

  constructor(private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit() {
    this.cargarProductos();

    this.formulario = this.fb.group({
      nombre: [''],
      precio: [''],
      descripcion: [''],
      stock: ['']
    });
  }

  cargarProductos() {
    this.productService.obtenerProductos().subscribe(res => {
      this.productos = res;
    });
  }

  onFileChange(e: any) {
    if (e.target.files.length > 0) {
      this.imagenArchivo = e.target.files[0];
      if (this.imagenArchivo) {
        this.imagenPrevia = URL.createObjectURL(this.imagenArchivo);
      }

    }
  }

  guardar() {
    const formData = new FormData();

    formData.append('nombre', this.formulario.value.nombre);
    formData.append('precio', this.formulario.value.precio);
    formData.append('descripcion', this.formulario.value.descripcion);
    formData.append('stock', this.formulario.value.stock);

    if (this.imagenArchivo) {
      formData.append('imagen', this.imagenArchivo);
    }

    if (this.editando && this.idEditando !== null) {
      this.productService.actualizarProducto(this.idEditando, formData).subscribe(() => {
        this.reset();
        this.cargarProductos();
      });
    } else {
      this.productService.crearProducto(formData).subscribe(() => {
        this.reset();
        this.cargarProductos();
      });
    }
  }

  editar(p: any) {
    this.editando = true;
    this.idEditando = p.id;

    this.formulario.patchValue({
      nombre: p.nombre,
      precio: p.precio,
      descripcion: p.descripcion,
      stock: p.stock
    });

    this.imagenPrevia = p.imagen
      ? `http://localhost/api_proyecto/public/uploads/${p.imagen}`
      : null;
  }

  eliminar(id: number) {
    this.productService.eliminarProducto(id).subscribe(() => {
      this.cargarProductos();
    });
  }

  reset() {
    this.editando = false;
    this.idEditando = null;
    this.formulario.reset();
    this.imagenArchivo = null;
    this.imagenPrevia = null;
  }
}
