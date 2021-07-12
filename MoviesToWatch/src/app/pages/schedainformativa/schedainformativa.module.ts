import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedainformativaPageRoutingModule } from './schedainformativa-routing.module';

import { SchedainformativaPage } from './schedainformativa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedainformativaPageRoutingModule
  ],
  declarations: [SchedainformativaPage]
})
export class SchedainformativaPageModule {}
