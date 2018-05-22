import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';
import { SystemConstants } from '../common/system.constants';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private headers: Headers;

  constructor(private _http: Http, private _router: Router, private _notificationService: NotificationService,
    private _utilityService: UtilityService, private _authenService: AuthenService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }
  addAuthenHeader() {
    this.headers.delete('x-auth');
    const userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.headers.append('x-auth', userData.token);
  }
  get(uri: string): Observable<any> {
    this.addAuthenHeader();
    return this._http.get(SystemConstants.BASE_API + uri, { headers: this.headers })
      .pipe(map(res => res.json()));
  }
  post(uri: string, data?: any): Observable<any> {
    this.addAuthenHeader();
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: this.headers })
      .pipe(map(res => res.json()));
  }
  delete(uri: string, key: string, id: string): Observable<any> {
    this.addAuthenHeader();
    return this._http.delete(SystemConstants.BASE_API + uri + '/?' + key + '=' + id, { headers: this.headers })
      .pipe(map(res => res.json()));
  }
  put(uri: string, data?: any): Observable<any> {
    this.addAuthenHeader();
    return this._http.put(SystemConstants.BASE_API + uri, data, { headers: this.headers })
      .pipe(map(res => res.json()));
  }
}
