import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '../../../shared/animations/shared-animation';
import { FuseConfigService } from '../../../../@fuse/services/config.service';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { AppModuleState } from '../../../core/store/reducer/reducer';
import * as loginActions from '../../../core/store/action/auth.actions';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class LoginComponent implements OnInit {

  loading: boolean;
  loadingText: string;
  loginForm: FormGroup;

  constructor(private _fuseConfigService: FuseConfigService,
              private _store$: Store<AppModuleState>,
              private _authService: AuthService,
              private _notificationService: NotificationService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLoginClick() {
    this.loading = true;
    this.loadingText = 'LOGGING...';
    this.login();
  }

  private login() {
    this._authService.login(this.loginForm.value)
      .subscribe(() => {
        this._store$.dispatch(loginActions.loginSuccess());
      }, () => {
        this.loading = false;
        this.loadingText = 'LOGIN';
        this._notificationService.error('Email does not exist or password is incorrect');
      });
  }

}
