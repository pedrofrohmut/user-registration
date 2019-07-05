import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-users",
  template: `
    <div class="container">
      <div class="col-m-8 offset-md-2">
        <app-registration></app-registration>
      </div>
    </div>
  `,
  styles: []
})
export class UsersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
