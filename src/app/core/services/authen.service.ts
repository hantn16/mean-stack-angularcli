import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { SystemConstants } from '../common/system.constants';
import { map } from 'rxjs/operators';
import { UserModel } from '../domain/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  public token: string;
  constructor(private _http: Http) { }
  login(email: string, password: string): Observable<UserModel> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this._http.post(SystemConstants.BASE_API + 'api/users/login',
    JSON.stringify({ email: email, password: password }), options)
      .pipe(map((response: Response) => {
        // login successful if there's a jwt token in the response
        console.log(JSON.stringify(response));
        const token = response.json().token;
        const user = response.json().user;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.removeItem(SystemConstants.CURRENT_USER);
          localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify({ user, token }));
          // return true to indicate successful login
          return response.json();
        } else {
          // return false to indicate failed login
          return null;
        }
      }));
  }
  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }
  isUserAuthenticated(): boolean {
    const user = localStorage.getItem(SystemConstants.CURRENT_USER);
    if (user != null) {
      return true;
    } else {
      return false;
    }
  }

  getLoggedInUser(): UserModel {
    let user: UserModel;
    if (this.isUserAuthenticated()) {
      const userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new UserModel();
      user.email = userData.user.email;
      user.name = userData.user.name;
      user.fullName = userData.user.fullName;
      user.imgLink = userData.user.imgLink;
    } else {
      user = null;
    }
    return user;
  }
}
