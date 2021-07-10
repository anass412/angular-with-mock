import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService,
    private apiService: ApiService,
    private router: Router,) { }

  ngOnInit(): void {
  }

  logout() {
    this.apiService.logout().subscribe(res => {
      if (res) {
        this.authService.removeSesstion();
        this.router.navigate(["login"]);
      }
    });
  }

}
