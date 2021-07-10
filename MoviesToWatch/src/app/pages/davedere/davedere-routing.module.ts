import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DavederePage } from './davedere.page';

const routes: Routes = [
  {
    path: '',
    component: DavederePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DavederePageRoutingModule {}
