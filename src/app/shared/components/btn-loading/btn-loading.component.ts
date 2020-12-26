import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';

@Component({
  selector: 'app-btn-loading',
  templateUrl: './btn-loading.component.html',
  styleUrls: ['./btn-loading.component.scss']
})
export class BtnLoadingComponent implements OnInit {

  @Input() loading: boolean;
  @Input() btnClass: string;
  @Input() disabled: boolean;
  @Input() loadingText = 'Please wait!';
  @Input() type: 'button' | 'submit' = 'submit';
  @Input() color: ThemePalette;

  constructor() {
  }

  ngOnInit() {
  }

}
