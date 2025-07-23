import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosList } from './articulos-list/articulos-list';
import { ArticulosForm } from './articulos-form/articulos-form';

const routes: Routes = [
  {
    path: '',
    component: ArticulosList,
  },
  { path: 'nuevo', component: ArticulosForm },
  { path: 'editar/:id', component: ArticulosForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticulosRoutingModule {}
