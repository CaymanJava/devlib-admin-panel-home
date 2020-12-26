import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { UserConfigService } from '../../app/core/services/user-config.service';
import { FuseConfig } from '../types';

// Create the injection token for the custom settings
export const FUSE_CONFIG = new InjectionToken('fuseCustomConfig');

@Injectable({
  providedIn: 'root'
})
export class FuseConfigService {

  private _configSubject: BehaviorSubject<any>;

  constructor(private _platform: Platform, private _router: Router,
              private _userConfigService: UserConfigService,
              @Inject(FUSE_CONFIG) private _config) {

    _userConfigService.getUserConfig().subscribe(config => {
      this._init(config);
    }, () => {
      this._init(_config);
    });
  }

  private _defaultConfig: any;

  get defaultConfig(): any {
    return this._defaultConfig;
  }

  get config(): any | Observable<any> {
    return this._configSubject.asObservable();
  }

  set config(value) {
    let config = this._configSubject.getValue();
    config = _.merge({}, config, value);
    this._configSubject.next(config);
  }

  setConfig(value, opts = {emitEvent: true}): void {
    // Get the value from the behavior subject
    let config = this._configSubject.getValue();

    // Merge the new config
    config = _.merge({}, config, value);

    // If emitEvent option is true...
    if (opts.emitEvent === true) {
      // Notify the observers
      this._configSubject.next(config);
    }
  }

  getConfig(): Observable<any> {
    return this._configSubject.asObservable();
  }

  resetToDefaults(): void {
    // Set the config from the default config
    this._configSubject.next(_.cloneDeep(this._defaultConfig));
  }

  private _init(config: FuseConfig): void {
    this._defaultConfig = config;

    if (this._platform.ANDROID || this._platform.IOS) {
      this._defaultConfig.customScrollbars = false;
    }

    this._configSubject = new BehaviorSubject(_.cloneDeep(this._defaultConfig));

    this._router.events
      .pipe(filter(event => event instanceof ResolveEnd))
      .subscribe(() => {
        if (!_.isEqual(this._configSubject.getValue().layout, this._defaultConfig.layout)) {
          const configuration = _.cloneDeep(this._configSubject.getValue());

          // Reset the layout from the default config
          configuration.layout = _.cloneDeep(this._defaultConfig.layout);

          // Set the config
          this._configSubject.next(configuration);
        }
      });
  }
}

