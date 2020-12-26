import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from './components/shared-components.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule,
    RouterModule,
  ],
  exports: [
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule,
  ],
  declarations: []
})
export class SharedModule {
}
