import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { LoggerService } from '@ngx-toolkit/logger';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';
import { NotificationService } from './notification.service';
import { PageableParams } from '../models/api.model';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
              private log: LoggerService,
              private tokenService: TokenService,
              private notificationService: NotificationService) {
  }

  get(url: string, pageableParams?: PageableParams, filterParams?: any, withAuth: boolean = true): Observable<HttpResponse<any>> {
    return this.processAPIRequest(API_URL + url, 'GET', withAuth, {}, pageableParams, filterParams);
  }

  put(url: string, data: any, withAuth: boolean = true): Observable<any> {
    return this.processAPIRequest(API_URL + url, 'PUT', withAuth, data);
  }

  post(url: string, data: any, withAuth: boolean = true): Observable<any> {
    return this.processAPIRequest(API_URL + url, 'POST', withAuth, data);
  }

  delete(url: string, withAuth: boolean = true): Observable<any> {
    return this.processAPIRequest(API_URL + url, 'DELETE', withAuth);
  }

  download(url: string, withAuth: boolean = true): Observable<HttpResponse<any>> {
    return this.processAPIRequest(API_URL + url, 'DOWNLOAD', withAuth);
  }

  private processAPIRequest(url: string, method: string, withAuth: boolean, data?: any, pageableParams?: PageableParams, filterParams?: any) {
    return this.callAPI(url, method, withAuth, data, pageableParams, filterParams)
      .pipe(catchError(initialError => throwError(initialError)));
  }

  private callAPI(url: string, method: string, withAuth: boolean, data?: any, pageableParams?: PageableParams, filterParams?: any) {
    const response: Observable<HttpResponse<any>> = this.getResponse(url, method, withAuth, data, pageableParams, filterParams);
    this.subscribeResponse(response, url, method);
    return response;
  }

  private getResponse(url: string, method: string, withAuth: boolean, data?: any, pageableParams?: PageableParams, filterParams?: any): Observable<HttpResponse<any>> {
    switch (method) {
      case 'GET':
        const urlSearchParams = this.prepareUrlSearchParams(pageableParams, filterParams, url);
        return this.http.get(url, {headers: this.getHeaders(withAuth), observe: 'response', params: urlSearchParams}).pipe(share());
      case 'POST':
        this.log.debug('Calling api [POST]', {url: url, data: data});
        return this.http.post(url, data, {headers: this.getHeaders(withAuth), observe: 'response'}).pipe(share());
      case 'PUT':
        this.log.debug('Calling api [PUT]', {url: url, data: data});
        return this.http.put(url, data, {headers: this.getHeaders(withAuth), observe: 'response'}).pipe(share());
      case 'DELETE':
        this.log.debug('Calling api [DELETE]', {url: url});
        return this.http.delete(url, {headers: this.getHeaders(withAuth), observe: 'response'}).pipe(share());
      case 'DOWNLOAD':
        this.log.debug('Calling api [GET]', {url: url, expectedResponseType: 'blob'});
        return this.http.get(url, {headers: this.getHeaders(withAuth), observe: 'response', responseType: 'blob'}).pipe(share());
    }
    return null;
  }

  private prepareUrlSearchParams(pageableParams: PageableParams, filterParams: any, url: string) {
    let urlSearchParams: HttpParams = new HttpParams();

    urlSearchParams = this.getPageableParams(urlSearchParams, pageableParams);
    urlSearchParams = this.getFilterParams(urlSearchParams, filterParams);

    this.log.debug('Calling api [GET]', {
      url: url,
      pageableParams: pageableParams,
      filterParams: filterParams,
      urlSearchParams: urlSearchParams
    });
    return urlSearchParams;
  }

  private getHeaders(withAuth: boolean): HttpHeaders {
    const headers: HttpHeaders = new HttpHeaders();
    if (withAuth) {
      const token = this.tokenService.getAccessToken();
      if (token) {
        return headers.append('Authorization', this.tokenService.getAccessToken());
      }
    }
    return headers;
  }

  private getPageableParams(urlSearchParams: HttpParams, pageableParams?: PageableParams) {
    if (typeof pageableParams !== 'undefined') {
      if (pageableParams.sort) {
        urlSearchParams = urlSearchParams.append('sort', `${pageableParams.sort.order},${pageableParams.sort.direction}`);
      }

      const pageableParamsSource: any = pageableParams;
      ['page', 'size'].forEach(key => {

        if (pageableParamsSource.hasOwnProperty(key)) {
          urlSearchParams = urlSearchParams.append(key, `${pageableParamsSource[key]}`);
        }
      });
    }

    return urlSearchParams;
  }

  private getFilterParams(urlSearchParams: HttpParams, filterParams?: any) {
    if (typeof filterParams !== 'undefined') {
      Object.keys(filterParams).map(key => {
        const value = filterParams[key];
        if (null != value && '' !== value) {
          urlSearchParams = urlSearchParams.append(key, `${value}`);
        }
      });
    }

    return urlSearchParams;
  }

  private subscribeResponse(response: Observable<HttpResponse<any>>, url: string, method: string) {
    response
      .subscribe((result: any) => {
          this.log.debug(`Got response from api [${method}]`, {url: url});
        }, (err: any) => {
          this.notificationService.error('Got error from api');
        }
      );
  }

}
