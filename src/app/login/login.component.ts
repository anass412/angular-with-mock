import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormBuilder().group({
      userName: new FormControl({ value: "", disabled: false }, Validators.required),
      password: new FormControl({ value: "", disabled: false }, Validators.required),
    });
  }

  login() {
    this.apiService.login(this.loginForm.getRawValue()).subscribe(res => {
      this.dialog.open(DialogComponent, { data: { msg: res.msg_ar }, minHeight: "10vh", minWidth: "10vw" });
      if (res.success) {
        this.authService.setToken(res.token);
        this.router.navigate(["home"]);
      }
    });
  }

}
