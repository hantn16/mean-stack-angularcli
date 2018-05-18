import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../core/services/authen.service';
import { NotificationService } from '../core/services/notification.service';
import { Router } from '@angular/router';
import { UrlConstants } from '../core/common/url.constants';
import { MessageContstants } from '../core/common/message.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  model: any = {};
  returnUrl: string;
  constructor(private _authenService:AuthenService, private _notificationService:NotificationService, 
    private router: Router) { }

  ngOnInit() {
  }
  login(){
    this.loading = true;
    this._authenService.login(this.model.username, this.model.password).subscribe(data => {
      this.router.navigate([UrlConstants.HOME]);
    }, error => {
      this._notificationService.printErrorMessage(MessageContstants.SYSTEM_ERROR_MSG);
      this.loading = false;
    });
  }

}
