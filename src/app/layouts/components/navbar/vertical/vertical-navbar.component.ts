import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter, take, takeUntil } from 'rxjs/operators';
import { AppUser } from '../../../../core/models/user.model';
import { FusePerfectScrollbarDirective } from '../../../../../@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import * as fromApp from '../../../../core/store/selector/app-user.selector';
import { FuseConfigService } from '../../../../../@fuse/services/config.service';
import { FuseNavigationService } from '../../../../../@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '../../../../../@fuse/components/sidebar/sidebar.service';
import { AppUserState } from '../../../../core/store/reducer/app-user.reducer';

@Component({
  moduleId: module.id,
  template: ''
})
export abstract class VerticalNavbarComponent implements OnInit, OnDestroy {

  appUser$: Observable<AppUser> = this._userStore.select(fromApp.selectUser);

  fuseConfig: any;
  navigation: any;

  private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
  private _unsubscribeAll: Subject<any>;


  constructor(private _fuseConfigService: FuseConfigService,
              private _fuseNavigationService: FuseNavigationService,
              private _fuseSidebarService: FuseSidebarService,
              private _userStore: Store<AppUserState>,
              private _router: Router) {
    this._unsubscribeAll = new Subject();
  }

  @ViewChild(FusePerfectScrollbarDirective, {static: true})
  set directive(theDirective: FusePerfectScrollbarDirective) {
    if (!theDirective) {
      return;
    }

    this._fusePerfectScrollbar = theDirective;
    this.subscribeOnItemCollapseToggled();
    this.subscribeToRouterEvents(this.getTimeOutFunction());
  }

  ngOnInit(): void {
    this.subscribeToRouterEvents(this.getCloseSidebarFunction());
    this.configureFuse();
    this.subscribeToNavigationChanges();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  toggleSidebarOpened(): void {
    this._fuseSidebarService.getSidebar('navbar').toggleOpen();
  }

  toggleSidebarFolded(): void {
    this._fuseSidebarService.getSidebar('navbar').toggleFold();
  }

  private subscribeToNavigationChanges() {
    this._fuseNavigationService.onNavigationChanged
      .pipe(
        filter(value => value !== null),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.navigation = this._fuseNavigationService.getCurrentNavigation();
      });
  }

  private configureFuse() {
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.fuseConfig = config;
      });
  }

  private getTimeOutFunction() {
    return () => setTimeout(() => {
      this._fusePerfectScrollbar.scrollToElement('navbar .nav-link.active', -120);
    });
  }

  private getCloseSidebarFunction() {
    return () => {
      if (this._fuseSidebarService.getSidebar('navbar')) {
        this._fuseSidebarService.getSidebar('navbar').close();
      }
    };
  }

  private subscribeToRouterEvents(subscribeCallback: any) {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(subscribeCallback);
  }

  private subscribeOnItemCollapseToggled() {
    this._fuseNavigationService.onItemCollapseToggled
      .pipe(
        delay(500),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this._fusePerfectScrollbar.update();
      });
  }

}
