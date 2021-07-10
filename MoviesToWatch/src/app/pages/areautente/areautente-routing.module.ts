import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreautentePage } from './areautente.page';

const routes: Routes = [
  {
    path: '',
    component: AreautentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreautentePageRoutingModule {}
