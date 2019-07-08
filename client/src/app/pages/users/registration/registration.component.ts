import { Component, OnInit } from "@angular/core"
import { UsersService } from "src/app/services/users.service"
import { ToastrService } from "ngx-toastr"

@Component({
  selector: "app-registration",
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
            <form
              [formGroup]="usersService.formModel"
              autocomplete="off"
              (submit)="onSubmit()"
            >
              <div class="form-group required">
                <label>UserName</label>

                <input
                  type="text"
                  class="form-control"
                  formControlName="UserName"
                />

                <span
                  class="text-danger"
                  *ngIf="
                    usersService.formModel.get('UserName').touched &&
                    usersService.formModel.get('UserName').errors?.required
                  "
                >
                  User Name is required and can not be empty.
                </span>
              </div>

              <div class="form-group required">
                <label>E-mail</label>

                <input
                  type="text"
                  class="form-control"
                  formControlName="Email"
                />

                <span
                  class="text-danger"
                  *ngIf="
                    usersService.formModel.get('Email').touched &&
                    usersService.formModel.get('Email').errors?.email
                  "
                >
                  User E-mail is invalid.
                </span>

                <span
                  class="text-danger"
                  *ngIf="
                    usersService.formModel.get('Email').touched &&
                    usersService.formModel.get('Email').errors?.required
                  "
                >
                  User E-mail is required.
                </span>
              </div>

              <div class="form-group required">
                <label>Full Name</label>

                <input
                  type="text"
                  class="form-control"
                  formControlName="FullName"
                />

                <span
                  class="text-danger"
                  *ngIf="
                    usersService.formModel.get('FullName').touched &&
                    usersService.formModel.get('FullName').errors?.required
                  "
                >
                  User Full Name is required.
                </span>
              </div>

              <div formGroupName="Passwords">
                <div class="form-group required">
                  <label>Password</label>

                  <input
                    type="password"
                    class="form-control"
                    formControlName="Password"
                  />

                  <span
                    class="text-danger"
                    *ngIf="
                      usersService.formModel.get('Passwords.Password')
                        .touched &&
                      usersService.formModel.get('Passwords.Password').errors
                        ?.required
                    "
                  >
                    User Password is Required.
                  </span>

                  <span
                    class="text-danger"
                    *ngIf="
                      usersService.formModel.get('Passwords.Password')
                        .touched &&
                      usersService.formModel.get('Passwords.Password').errors
                        ?.minlength
                    "
                  >
                    Password needs to be 4 characters long or more.
                  </span>
                </div>

                <div class="form-group required">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    class="form-control"
                    formControlName="ConfirmPassword"
                  />
                </div>

                <span
                  class="text-danger"
                  *ngIf="
                    usersService.formModel.get('Passwords.ConfirmPassword')
                      .touched &&
                    usersService.formModel.get('Passwords.ConfirmPassword')
                      .errors?.required
                  "
                >
                  User Confirm Password is Required.
                </span>

                <span
                  class="text-danger"
                  *ngIf="
                    usersService.formModel.get('Passwords.ConfirmPassword')
                      .touched &&
                    usersService.formModel.get('Passwords.ConfirmPassword')
                      .errors?.passwordMismatch
                  "
                >
                  Password and Confirm Password do not match.
                </span>
              </div>

              <div class="form-row">
                <div class="form-group col-md-8 offset-md-2 my-3">
                  <button
                    type="submit"
                    class="btn btn-lg btn-block"
                    [disabled]="!usersService.formModel.valid"
                  >
                    Sing Up
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
export class RegistrationComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.usersService.formModel.reset()
  }

  onSubmit() {
    this.usersService.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.usersService.formModel.reset()
          this.toastr.success("New User Created!", "Registration Successful")
        } else {
          res.errors.forEach(error =>
            this.toastr.error(error.description, error.code)
          )
        }
      },
      err => {
        console.log(err)
      }
    )
  }
}
