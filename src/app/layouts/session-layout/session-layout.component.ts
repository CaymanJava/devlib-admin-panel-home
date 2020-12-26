import { Component, Inject, OnInit } from '@angular/core';
import { FuseSplashScreenService } from '../../../@fuse/services/splash-screen.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-session-layout',
  templateUrl: './session-layout.component.html'
})
export class SessionLayoutComponent implements OnInit {

  constructor(private _fuseSplashScreenService: FuseSplashScreenService,
              @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit(): void {
    this.document.body.classList.add('theme-default');
  }

}
