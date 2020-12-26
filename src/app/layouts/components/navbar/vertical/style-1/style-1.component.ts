import { Component, ViewEncapsulation } from '@angular/core';
import { VerticalNavbarComponent } from '../vertical-navbar.component';

@Component({
  selector: 'navbar-vertical-style-1',
  templateUrl: './style-1.component.html',
  styleUrls: ['./style-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component extends VerticalNavbarComponent {

}
