import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSidebarModule } from '@fuse/components/index';
import { FuseSharedModule } from '@fuse/shared.module';

import { ContentModule } from 'app/layouts/components/content/content.module';
import { NavbarModule } from 'app/layouts/components/navbar/navbar.module';
import { ToolbarModule } from 'app/layouts/components/toolbar/toolbar.module';
import { VerticalLayout3Component } from './layout-3.component';
import { FooterModule } from '../../../../shared/components/navigation/footer/footer.module';

@NgModule({
  declarations: [
    VerticalLayout3Component
  ],
  imports: [
    RouterModule,

    FuseSharedModule,
    FuseSidebarModule,

    ContentModule,
    FooterModule,
    NavbarModule,
    ToolbarModule
  ],
  exports: [
    VerticalLayout3Component
  ]
})
export class VerticalLayout3Module {
}
