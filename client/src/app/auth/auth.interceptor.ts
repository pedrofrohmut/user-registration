import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { tap } from "rxjs/operators"
import { Router } from "@angular/router"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token")
    if (token != null) {
      const clonedReq = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`)
      })
      return next.handle(clonedReq).pipe(
        tap(
          successs => {},
          error => {
            if (error.status === 401) {
              localStorage.removeItem("token")
              this.router.navigateByUrl("/users/login")
            }
          }
        )
      )
    } else {
      return next.handle(req.clone())
    }
  }
}
