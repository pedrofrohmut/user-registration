import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-forbidden",
  template: `
    <div class="row">
      <div class="col s6 offset-s3">
        <div class="card">
          <div class="card-image">
            <img
              src="/assets/img/403.png"
              style="height: 300px; width: 300px"
            />
          </div>

          <div class="card-content">
            <span class="card-title">403 - Access Denied</span>
            <p>You don't have permission to access this resource.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ForbiddenComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
