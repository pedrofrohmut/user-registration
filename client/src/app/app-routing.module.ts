import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { RegistrationComponent } from "./pages/users/registration/registration.component"
import { LoginComponent } from "./pages/users/login/login.component"
import { HomeComponent } from "./pages/home/home.component"
import { AuthGuard } from "./auth/auth.guard"

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "users",
    children: [
      { path: "registration", component: RegistrationComponent },
      { path: "login", component: LoginComponent }
    ]
  },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
