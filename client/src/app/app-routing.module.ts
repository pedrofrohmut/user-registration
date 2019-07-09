import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { RegistrationComponent } from "./pages/users/registration/registration.component"
import { LoginComponent } from "./pages/users/login/login.component"
import { HomeComponent } from "./pages/home/home.component"
import { AuthGuard } from "./auth/auth.guard"
import { ForbiddenComponent } from "./pages/forbidden/forbidden.component"
import { AdminPanelComponent } from "./pages/admin-panel/admin-panel.component"

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "users",
    children: [
      { path: "registration", component: RegistrationComponent },
      { path: "login", component: LoginComponent },
    ],
  },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "forbidden", component: ForbiddenComponent },
  { path: "admin-panel", component: AdminPanelComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
