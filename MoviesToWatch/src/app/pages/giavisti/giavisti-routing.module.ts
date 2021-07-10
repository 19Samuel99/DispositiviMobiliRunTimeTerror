import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiavistiPage } from './giavisti.page';

const routes: Routes = [
  {
    path: '',
    component: GiavistiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiavistiPageRoutingModule {}
