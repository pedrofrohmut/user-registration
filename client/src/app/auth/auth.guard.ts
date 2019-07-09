import { Injectable } from "@angular/core"
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
} from "@angular/router"
import { UsersService } from "src/app/services/users.service"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private usersService: UsersService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return true
    // if (localStorage.getItem("token") != null) {
    // const roles = next.data["permittedRoles"] as Array<string>
    // if (roles && !this.usersService.roleMatch(roles)) {
    // this.router.navigateByUrl("forbidden")
    // return false
    // }

    // return true
    // }
    // this.router.navigateByUrl("users/login")
    // return false
  }
}
