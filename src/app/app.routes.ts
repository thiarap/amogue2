import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { CarritoComponent } from './compartidos/carrito/carrito.component';
import { NosotrosComponent } from './paginas/nosotros/nosotros.component';
import { CompraComponent } from './paginas/compra/compra.component';
import { InicioSesionComponent } from './auth/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AdminGuard } from './guards/admin.guard'; // importa el guard
import { AdminComponent } from './paginas/admin/admin.component';
import { ComprasComponent } from './paginas/compras/compras.component';
import { TicketComponent } from './paginas/ticket/ticket.component';
import { NovedadesComponent } from './paginas/novedades/novedades.component';

export const routes: Routes = [


  { path: 'inicio', component: InicioComponent },

  { path: 'productos', component: ProductosComponent },

  { path: 'novedades', component: NovedadesComponent },

  { path: 'contacto', component: ContactoComponent },

  // -----------------------------------------------------------
  // Página de carrito del usuario (requiere estar logueado
  // pero no tiene guard explícito, así que se accede sin restricciones;
  // el componente mismo define mensajes si no hay token)
  // -----------------------------------------------------------
  { path: 'carrito', component: CarritoComponent },

  { path: 'nosotros', component: NosotrosComponent },


  { path: 'compra', component: CompraComponent },


  { path: 'login', component: InicioSesionComponent },


  { path: 'register', component: RegistroComponent },


  { path: 'compras', component: ComprasComponent },

  // -----------------------------------------------------------
  // Página del ticket generado tras comprar
  // Se usa loadComponent() → lazy loading del componente
  // Esto evita cargar el componente hasta que alguien acceda.
  // Se obtiene el :id de la compra (id_compra)
  // -----------------------------------------------------------
  {
    path: 'ticket/:id',
    loadComponent: () =>
      import('./paginas/ticket/ticket.component')
        .then(m => m.TicketComponent)
  },

  // -----------------------------------------------------------
  // Panel de administración
  // Está protegido por AdminGuard → solo usuario con rol "admin"
  // puede acceder.
  // Si no es admin, se redirige a /inicio-sesion (login)
  // -----------------------------------------------------------
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },

  // -----------------------------------------------------------
  // Ruta por defecto: redirige a /inicio
  // -----------------------------------------------------------
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  // -----------------------------------------------------------
  // Ruta comodín para cualquier ruta inexistente
  // -----------------------------------------------------------
  { path: '**', redirectTo: 'inicio' },
];
