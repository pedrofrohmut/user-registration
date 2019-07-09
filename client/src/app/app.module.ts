import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule, FormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"
import { AppRoutingModule } from "./app-routing.module"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { ToastrModule } from "ngx-toastr"

import { AppComponent } from "./app.component"
import { RegistrationComponent } from "./pages/users/registration/registration.component"

import { UsersService } from "./services/users.service"
import { LoginComponent } from "./pages/users/login/login.component";
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { AdminPanelComponent } from './page/admin-panel/admin-panel.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component'

@NgModule({
  declarations: [AppComponent, RegistrationComponent, LoginComponent, HomeComponent, NavbarComponent, AdminPanelComponent, ForbiddenComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    })
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
