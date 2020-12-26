import { Component, ViewEncapsulation } from '@angular/core';
import { VerticalLayoutComponent } from '../vertical-layout.component';

@Component({
  selector: 'vertical-layout-1',
  templateUrl: './layout-1.component.html',
  styleUrls: ['./layout-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component extends VerticalLayoutComponent {

}
