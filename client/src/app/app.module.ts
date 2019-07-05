import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"
import { AppRoutingModule } from "./app-routing.module"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { ToastrModule } from "ngx-toastr"

import { AppComponent } from "./app.component"
import { UsersComponent } from "./pages/users/users.component"
import { RegistrationComponent } from "./pages/users/registration/registration.component"

import { UsersService } from "./services/users.service"

@NgModule({
  declarations: [AppComponent, UsersComponent, RegistrationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
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
