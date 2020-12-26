import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/core/navigation/navigation';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { AppUserState } from '../../../core/store/reducer/app-user.reducer';
import { AppUser } from '../../../core/models/user.model';
import * as fromApp from '../../../core/store/selector/app-user.selector';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {

  appUser$: Observable<AppUser> = this._userStore.select(fromApp.selectUser);

  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  // userStatusOptions: any[];

  private _unsubscribeAll: Subject<any>;

  constructor(private _fuseConfigService: FuseConfigService,
              private _fuseSidebarService: FuseSidebarService,
              private _userStore: Store<AppUserState>,
              private _authService: AuthService,
              private _translateService: TranslateService) {
    // this.userStatusOptions = [
    //   {
    //     title: 'Online',
    //     icon: 'icon-checkbox-marked-circle',
    //     color: '#4CAF50'
    //   },
    //   {
    //     title: 'Away',
    //     icon: 'icon-clock',
    //     color: '#FFC107'
    //   },
    //   {
    //     title: 'Do not Disturb',
    //     icon: 'icon-minus-circle',
    //     color: '#F44336'
    //   },
    //   {
    //     title: 'Invisible',
    //     icon: 'icon-checkbox-blank-circle-outline',
    //     color: '#BDBDBD'
    //   },
    //   {
    //     title: 'Offline',
    //     icon: 'icon-checkbox-blank-circle-outline',
    //     color: '#616161'
    //   }
    // ];

    this.initLanguages();
    this.navigation = navigation;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.configureFuse();
    this.selectCurrentLanguage();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  search(value): void {
    console.log(value);
  }

  setLanguage(lang): void {
    this.selectedLanguage = lang;
    this._translateService.use(lang.id);
  }

  onLogout() {
    this._authService.logout();
  }

  private selectCurrentLanguage() {
    this.selectedLanguage = _.find(this.languages, {id: this._translateService.currentLang});
  }

  private configureFuse() {
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((settings) => {
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });
  }

  private initLanguages() {
    this.languages = [
      {
        id: 'en',
        title: 'English',
        flag: 'us'
      },
      {
        id: 'ru',
        title: 'Русский',
        flag: 'ru'
      }
    ];
  }

}
