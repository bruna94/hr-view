import {Component, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Observable}  from 'rxjs/Observable';
import {LoginService} from '../../login.service';

import 'style-loader!./login.scss';

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login implements OnInit {
  loggedIn: boolean;
  public form:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder, private loginService: LoginService) {
    if(localStorage.getItem('PortalAdminHasLoggedIn') == '' || localStorage.getItem('PortalAdminHasLoggedIn') == null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }

    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      this.loginService.sendCredential(this.username, this.password).subscribe(
        res => {
          this.loggedIn=true;
          localStorage.setItem('PortalAdminHasLoggedIn', 'true');
          location.reload();
        },
        err => console.log(err)
      );
    }
  }
    ngOnInit() {}
}
