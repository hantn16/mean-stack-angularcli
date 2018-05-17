import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { SystemConstants } from '../common/system.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  public token: string;
  constructor(private _http: Http) { }
  login(email: string, password: string): Observable<boolean> {
    return this._http.post(SystemConstants.BASE_API + 'api/users/login', JSON.stringify({ email: email, password: password }))
      .pipe(map((response: Response) => {
        // login successful if there's a jwt token in the response
        console.log(JSON.stringify(response));
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify({ email: email, token: token }));
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      }));
  }
  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem(SystemConstants.CURRENT_USER);
}
}
