import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layouts/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromFeature from './core/store/reducer/reducer';
import { CoreModule } from './core/core.module';
import { Level, LoggerModule } from '@ngx-toolkit/logger';

const LOG_LEVEL: Level = isDevMode() ? Level.INFO : Level.ERROR;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    LayoutModule,
    CoreModule,
    LoggerModule.forRoot(LOG_LEVEL),
    StoreModule.forFeature('app', fromFeature.reducers)
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
