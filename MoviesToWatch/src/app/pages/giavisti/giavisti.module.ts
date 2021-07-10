import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiavistiPageRoutingModule } from './giavisti-routing.module';

import { GiavistiPage } from './giavisti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiavistiPageRoutingModule
  ],
  declarations: [GiavistiPage]
})
export class GiavistiPageModule {}
