import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "app-navbar",
  template: `
    <nav class="navbar navbar-dark bg-dark text-white mb-4">
      <a [routerLink]="['/home']" class="navbar-brand text-white">
        JWT Auth System
      </a>

      <div class="mr-auto">
        <a class="navbar-link text-white ml-3" routerLink="/home">Home</a>

        <a class="navbar-link text-white" routerLink="/admin">Admin Panel</a>

        <a class="navbar-link text-white ml-3" routerLink="/users/login">
          Sing In
        </a>

        <a class="navbar-link text-white ml-3" routerLink="/users/registration">
          Sign Up
        </a>
      </div>

      <button class="btn btn-danger my-2 my-sm-0" (click)="onLogout()">
        Log Out
      </button>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onLogout() {
    localStorage.removeItem("token")
    this.router.navigateByUrl("users/login")
  }
}
