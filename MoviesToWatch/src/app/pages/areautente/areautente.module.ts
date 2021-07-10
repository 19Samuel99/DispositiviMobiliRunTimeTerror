import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreautentePageRoutingModule } from './areautente-routing.module';

import { AreautentePage } from './areautente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreautentePageRoutingModule
  ],
  declarations: [AreautentePage]
})
export class AreautentePageModule {}
