import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { BtnLoadingComponent } from './btn-loading/btn-loading.component';
import { MatButtonModule } from '@angular/material/button';

const components = [
  BtnLoadingComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedPipesModule,
    SharedDirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  declarations: [...components],
  exports: [...components]
})
export class SharedComponentsModule {
}
