import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { DashboardComponentComponent } from './components/dashboard-component/dashboard-component.component';
import { TranslateModule } from '@ngx-translate/core';

export const pages = [
  DashboardPageComponent
];

export const components = [
  DashboardComponentComponent
];

@NgModule({
  imports: [
    DashboardRoutingModule,
    NgxDatatableModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule
  ],
  declarations: [...components, ...pages]
})
export class DashboardModule {


}
