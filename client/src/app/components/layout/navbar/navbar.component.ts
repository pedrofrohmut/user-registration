import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"

@Component({
  selector: "app-navbar",
  template: `
    <nav class="navbar navbar-dark bg-dark text-white">
      <a
        [routerLink]="['/products', productId]"
        class="navbar-brand text-white"
      >
        JWT Auth System
      </a>
      <button class="btn btn-danger my-2 my-sm-0" (click)="onLogout()">
        Log Out
      </button>
    </nav>
  `,
  styles: []
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onLogout() {
    localStorage.removeItem("token")
    this.router.navigateByUrl("users/login")
  }
}
