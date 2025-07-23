import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendasList } from './tiendas-list/tiendas-list';
import { TiendasForm } from './tiendas-form/tiendas-form';

const routes: Routes = [
  {
    path: '',
    component: TiendasList,
  },
  { path: 'nuevo', component: TiendasForm },
  { path: 'editar/:id', component: TiendasForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendasRoutingModule {}
