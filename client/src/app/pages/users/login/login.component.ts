import { Component, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { UsersService } from "src/app/services/users.service"
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"

@Component({
  selector: "app-login",
  template: `
    <div class="wrapper">
      <div class="wrapped-div">
        <div class="tab-header">
          <h2 routerLink="/users/login" routerLinkActive="active">Sign In</h2>
          <h2 routerLink="/users/registration" routerLinkActive="active">
            Sign Up
          </h2>
        </div>
        <div class="row">
          <div class="col-md-10 offset-md-1 py-3">
            <img
              src="/assets/img/single_user.png"
              alt="single user"
              class="mx-auto d-block"
            />

            <form
              #form="ngForm"
              class="mb-4"
              autocomplete="off"
              (submit)="onSubmit(form)"
            >
              <div class="form-group">
                <label>User Name</label>
                <input
                  type="text"
                  class="form-control"
                  #UserName="ngModel"
                  name="UserName"
                  [(ngModel)]="formModel.UserName"
                  required
                />
              </div>

              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  #Password="ngModel"
                  name="Password"
                  [(ngModel)]="formModel.Password"
                  required
                />
              </div>

              <div class="form-row">
                <div class="form-group col-md-8 offset-md-2 my-3">
                  <button
                    type="submit"
                    class="btn btn-lg btn-block"
                    [disabled]="form.invalid"
                  >
                    Sing In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: "",
    Password: ""
  }

  constructor(
    private usersService: UsersService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("token") != null) {
      this.router.navigateByUrl("/home")
    }
  }

  onSubmit(form: NgForm) {
    this.usersService.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem("token", res.token)
        this.router.navigateByUrl("/home")
      },
      err => {
        console.log(err)
        if (err.status === 400) {
          this.toastrService.error(
            "Incorrect username or password.",
            " Authentication Failed."
          )
        } else {
          console.log("Error (not 400): ", err)
        }
      }
    )
  }
}
