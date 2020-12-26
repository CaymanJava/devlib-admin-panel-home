import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { FuseConfigService } from '../../../@fuse/services/config.service';
import { FuseNavigationService } from '../../../@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '../../../@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '../../../@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '../../../@fuse/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@angular/cdk/platform';
import { locale as navigationEnglish } from '../../core/navigation/i18n/en';
import { navigation } from 'app/core/navigation/navigation';
import { takeUntil } from 'rxjs/operators';
import { AppUserState } from '../../core/store/reducer/app-user.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../../core/store/action/auth.actions';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentLayoutComponent implements OnInit, OnDestroy {

  fuseConfig: any;
  navigation: any;

  private _unsubscribeAll: Subject<any>;

  constructor(@Inject(DOCUMENT) private document: any,
              private _fuseConfigService: FuseConfigService,
              private _fuseNavigationService: FuseNavigationService,
              private _fuseSidebarService: FuseSidebarService,
              private _fuseSplashScreenService: FuseSplashScreenService,
              private _fuseTranslationLoaderService: FuseTranslationLoaderService,
              private _translateService: TranslateService,
              private _store: Store<AppUserState>,
              private _platform: Platform) {
    this.configureNavigation();
    this.prepareLanguages();
    this.setIsMobile();
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._store.dispatch(authActions.loadUser());
    this.configureFuse();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private configureFuse() {
    this._fuseConfigService.config
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((config) => {
        this.fuseConfig = config;
        this.setBoxedParameter();
        this.setThemeColor();
      });
  }

  private setThemeColor() {
    for (let i = 0; i < this.document.body.classList.length; i++) {
      const className = this.document.body.classList[i];

      if (className.startsWith('theme-')) {
        this.document.body.classList.remove(className);
      }
    }
    this.document.body.classList.add(this.fuseConfig.colorTheme);
  }

  private setBoxedParameter() {
    if (this.fuseConfig.layout.width === 'boxed') {
      this.document.body.classList.add('boxed');
    } else {
      this.document.body.classList.remove('boxed');
    }
  }

  private setIsMobile() {
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }
  }

  private prepareLanguages() {
    this._translateService.addLangs(['en', 'ru']);
    this._translateService.setDefaultLang('en');
    this._fuseTranslationLoaderService.loadTranslations(navigationEnglish);
    this._translateService.use('en');
  }

  private configureNavigation() {
    this.navigation = navigation;
    this._fuseNavigationService.register('main', this.navigation);
    this._fuseNavigationService.setCurrentNavigation('main');
  }

}
