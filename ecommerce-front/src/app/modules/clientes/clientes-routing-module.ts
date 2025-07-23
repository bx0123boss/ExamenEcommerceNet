import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesList } from './clientes-list/clientes-list';
import { ClientesForm } from './clientes-form/clientes-form';

const routes: Routes = [
  {
    path: '',
    component: ClientesList,
  },
  {
    path: 'list',
    component: ClientesList,
  },
  { path: 'nuevo', component: ClientesForm },
  { path: 'editar/:id', component: ClientesForm },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
