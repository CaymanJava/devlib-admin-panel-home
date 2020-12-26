import { NgModule } from '@angular/core';

import { fuseConfig } from '../fuse-config';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '../../@fuse/components';
import { FuseSharedModule } from '../../@fuse/shared.module';
import { ContentLayoutComponent } from './content-layout/content-layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseModule } from './fuse.module';
import { VerticalLayout1Module } from './components/vertical/layout-1/layout-1.module';
import { VerticalLayout2Module } from './components/vertical/layout-2/layout-2.module';
import { VerticalLayout3Module } from './components/vertical/layout-3/layout-3.module';
import { HorizontalLayout1Module } from './components/horizontal/layout-1/layout-1.module';
import { SessionLayoutComponent } from './session-layout/session-layout.component';
import { RouterModule } from '@angular/router';
import { ContentModule } from './components/content/content.module';

@NgModule({
  declarations: [
    ContentLayoutComponent,
    SessionLayoutComponent
  ],
  imports: [
    RouterModule,

    VerticalLayout1Module,
    VerticalLayout2Module,
    VerticalLayout3Module,
    HorizontalLayout1Module,
    ContentModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // Material
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    VerticalLayout1Module,
    VerticalLayout2Module,
    VerticalLayout3Module,
    HorizontalLayout1Module,
  ],
})
export class LayoutModule {
}
