import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { LoggerService } from '@ngx-toolkit/logger';
import { User, UserRole, UserUpdateRequest } from '../models/user.model';
import { PageableParams, PageSlice } from '../models/api.model';
import { ApiService } from './api.service';

const routes = {
  me: () => `/me`,
  members: () => `/users`,
  block: (id: number) => `/users/${id}/block`,
  unblock: (id: number) => `/users/${id}/unblock`,
  changeRole: (id: number, role: string) => `/members/${id}/role/${role}`
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService,
              private log: LoggerService) {
  }

  getUser(): Observable<User> {
    return this.apiService.get(routes.me(), {}, {})
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Got user', {response: response});
          return <User> response.body;
        }));
  }

  update(request: UserUpdateRequest): Observable<void> {
    return this.apiService.put(routes.me(), request)
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Updated user', {response: response});
        }));
  }

  getUsers(pageableParams: PageableParams = {page: 0}, filterParams: any = {}): Observable<PageSlice> {
    return this.apiService.get(routes.members(), pageableParams, filterParams)
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Got users', {response: response});
          return <PageSlice> response.body;
        }));
  }

  blockUser(userId: number): Observable<void> {
    return this.apiService.put(routes.block(userId), {})
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Blocked user', {response: response});
        }));
  }

  unblockUser(userId: number): Observable<void> {
    return this.apiService.put(routes.unblock(userId), {})
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Unblocked user', {response: response});
        }));
  }

  changeRole(userId: number, role: UserRole): Observable<void> {
    return this.apiService.put(routes.changeRole(userId, role), {})
      .pipe(
        map((response: HttpResponse<any>) => {
          this.log.debug('Changed user role', {response: response});
        }));
  }

}
