import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { HorizontalLayout1Component } from './layout-1.component';
import { ContentModule } from '../../content/content.module';
import { FooterModule } from '../../../../shared/components/navigation/footer/footer.module';
import { NavbarModule } from '../../navbar/navbar.module';
import { ToolbarModule } from '../../toolbar/toolbar.module';


@NgModule({
  declarations: [
    HorizontalLayout1Component
  ],
  imports: [
    MatSidenavModule,

    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    ContentModule,
    FooterModule,
    NavbarModule,
    ToolbarModule
  ],
  exports: [
    HorizontalLayout1Component
  ]
})
export class HorizontalLayout1Module {
}
