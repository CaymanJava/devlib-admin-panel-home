import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _toastr: ToastrService) {
  }

  success(message: string) {
    this._toastr.success(message, 'Success!', {timeOut: 2000, closeButton: true, progressBar: true});
  }

  warning(message: string) {
    this._toastr.warning(message, 'Warning!', {timeOut: 2000, closeButton: true, progressBar: true});
  }

  info(message: string) {
    this._toastr.info(message, 'Info', {timeOut: 2000, closeButton: true, progressBar: true});
  }

  error(message: string) {
    this._toastr.error(message, 'Error', {timeOut: 2000, closeButton: true, progressBar: true});
  }

}
