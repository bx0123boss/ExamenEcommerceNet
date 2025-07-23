import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth-module').then((m) => m.AuthModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./modules/cart/cart-module').then((m) => m.CartModule),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./modules/clientes/clientes-module').then(
        (m) => m.ClientesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'articulos',
    loadChildren: () =>
      import('./modules/articulos/articulos-module').then(
        (m) => m.ArticulosModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'tiendas',
    loadChildren: () =>
      import('./modules/tiendas/tiendas-module').then((m) => m.TiendasModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/clientes/list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
