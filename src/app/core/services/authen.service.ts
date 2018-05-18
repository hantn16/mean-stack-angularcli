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
  login(email: string, password: string): Observable<boolean> {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers })
    return this._http.post(SystemConstants.BASE_API + 'api/users/login', JSON.stringify({ email: email, password: password }))
      .pipe(map((response: Response) => {
        // login successful if there's a jwt token in the response
        console.log(JSON.stringify(response));
        let token = response.json().tokens[0].token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.removeItem(SystemConstants.CURRENT_USER);
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
  isUserAuthenticated(): boolean {
    let user = localStorage.getItem(SystemConstants.CURRENT_USER);
    if (user != null) {
      return true;
    }
    else
      return false;
  }

  getLoggedInUser(): UserModel {
    let user: UserModel;
    if (this.isUserAuthenticated()) {
      var userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new UserModel();
      user.email = userData.email;
      user.name = userData.name;
      user.surname = userData.surname;
      user.imgLink = userData.imgLink;
    }
    else {
      user = null;
    }    
    return user;
  }
}
