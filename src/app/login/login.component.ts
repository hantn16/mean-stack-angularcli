import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AuthenService } from '../core/services/authen.service';
import { NotificationService } from '../core/services/notification.service';
import { Router } from '@angular/router';
import { UrlConstants } from '../core/common/url.constants';
import { MessageContstants } from '../core/common/message.constants';
import { UserModel } from '../core/domain/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnChanges {

  @Input() userModel: UserModel;
  loginForm: FormGroup;

  loading = false;
  model: any = {};
  returnUrl: string;
  ngOnChanges(): void {
    this.loginForm.reset();
  }

  constructor(private _authenService: AuthenService, private _notificationService: NotificationService,
    private router: Router, private fb: FormBuilder) {
    this.createForm();
  }
  createForm(): any {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login() {
    this.loading = true;
    this.userModel = new UserModel();
    this._authenService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(data => {
        this.router.navigate([UrlConstants.HOME]);
      }, error => {
        this._notificationService.printErrorMessage(/*MessageContstants.SYSTEM_ERROR_MSG*/'Loi cmnr');
        this.loading = false;
      });
  }

}
