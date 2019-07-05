import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { UsersComponent } from "./pages/users/users.component"
import { RegistrationComponent } from "./pages/users/registration/registration.component"

const routes: Routes = [{ path: "", component: UsersComponent }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}