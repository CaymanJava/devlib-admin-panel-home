import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FuseConfig } from '../../../@fuse/types';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  fuseConfig: FuseConfig = {
    colorTheme: 'theme-default',
    customScrollbars: true,
    layout: {
      style: 'vertical-layout-3',
      width: 'fullwidth',
      navbar: {
        primaryBackground: 'fuse-navy-700',
        secondaryBackground: 'fuse-navy-900',
        folded: false,
        hidden: false,
        position: 'left',
        variant: 'vertical-style-1'
      },
      toolbar: {
        customBackgroundColor: false,
        background: 'fuse-white-500',
        hidden: false,
        position: 'above-static'
      },
      footer: {
        customBackgroundColor: true,
        background: 'fuse-navy-900',
        hidden: false,
        position: 'above-fixed'
      },
      sidepanel: {
        hidden: false,
        position: 'right'
      }
    }
  };


  getUserConfig(): Observable<FuseConfig> {
    return of(this.fuseConfig);
  }

}
