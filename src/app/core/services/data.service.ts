import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';
import { SystemConstants } from '../common/system.constants';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private headers: Headers;
  private extractData = (res: Response) => {
    let body = res.json();
    return body || {};
  }
  constructor(private _http: Http, private _router: Router, private _notificationService: NotificationService, private _utilityService: UtilityService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }
  get(uri: string) {
    return this._http.get(SystemConstants.BASE_API + uri, { headers: this.headers }).pipe(map(this.extractData));
  }
  pos
}
