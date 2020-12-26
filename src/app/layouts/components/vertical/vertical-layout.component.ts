import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '../../../../@fuse/services/config.service';
import { navigation } from 'app/core/navigation/navigation';

@Component({
  moduleId: module.id,
  template: ''
})
export abstract class VerticalLayoutComponent implements OnInit, OnDestroy {

  fuseConfig: any;
  navigation: any;

  private _unsubscribeAll: Subject<any>;

  constructor(private _fuseConfigService: FuseConfigService) {
    this.navigation = navigation;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._fuseConfigService.config
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((config) => {
        this.fuseConfig = config;
      });
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
