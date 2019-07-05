import { Injectable } from "@angular/core"
import { FormBuilder, Validators, FormGroup } from "@angular/forms"
import { HttpClient } from "@angular/common/http"

const SERVER_URL = "http://localhost:5000"
const USERS_URL = `${SERVER_URL}/api/applicationusers`

@Injectable({
  providedIn: "root"
})
export class UsersService {
  formModel = this.formBuilder.group({
    UserName: ["", Validators.required],
    Email: ["", [Validators.email, Validators.required]],
    FullName: ["", Validators.required],
    Passwords: this.formBuilder.group(
      {
        Password: ["", [Validators.minLength(4), Validators.required]],
        ConfirmPassword: ["", Validators.required]
      },
      { validator: this.comparePasswordsCtrls }
    )
  })

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  comparePasswordsCtrls(fb: FormGroup) {
    const confirmPasswordControl = fb.get("ConfirmPassword")
    // passwordMismatch
    // confirmPasswordControl.errors = { passwordMismatch: true }
    if (
      confirmPasswordControl.errors == null ||
      "passwordMismatch" in confirmPasswordControl.errors
    ) {
      if (fb.get("Password").value != confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true })
      } else {
        confirmPasswordControl.setErrors(null)
      }
    }
  }

  register() {
    const body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    }

    return this.http.post(`${USERS_URL}/register`, body)
  }
}
