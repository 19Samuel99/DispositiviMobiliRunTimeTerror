import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedainformativaPage } from './schedainformativa.page';

const routes: Routes = [
  {
    path: '',
    component: SchedainformativaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedainformativaPageRoutingModule {}
