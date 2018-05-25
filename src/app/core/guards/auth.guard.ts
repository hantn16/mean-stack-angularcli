import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SystemConstants } from '../../core/common/system.constants';
import { UrlConstants } from '../../core/common/url.constants';
import { AuthenService } from '../services/authen.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authenService: AuthenService) {

    }
    canActivate(activateRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
        if (localStorage.getItem(SystemConstants.EXPIRES_AT)) {

            return this.authenService.isLoggedIn();
        } else {
            this.router.navigate([UrlConstants.LOGIN], {
                queryParams: {
                    returnUrl: routerState.url
                }
            });
            return false;
        }
    }
}
