import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../../../@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as russian } from './i18n/ru';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.scss']
})
export class DashboardComponentComponent implements OnInit {

  constructor(private _fuseTranslationLoaderService: FuseTranslationLoaderService) {
  }

  ngOnInit(): void {
    this._fuseTranslationLoaderService.loadTranslations(english, russian);
  }

}
