import { Component, OnInit } from "@angular/core"
import { UserProfilesService } from "src/app/services/user-profiles.service"

@Component({
  selector: "app-home",
  template: `
    <div class="card m-5" *ngIf="userDetails">
      <ul class="list-group">
        <li class="list-group-item">
          <strong>UserName:</strong> {{ userDetails.userName }}
        </li>
        <li class="list-group-item">
          <strong>FullName:</strong> {{ userDetails.fullName }}
        </li>
        <li class="list-group-item">
          <strong>E-mail:</strong> {{ userDetails.email }}
        </li>
      </ul>
    </div>
  `,
  styles: [
    `
      .card {
        width: 282px;
      }
    `
  ]
})
export class HomeComponent implements OnInit {
  userDetails

  constructor(private userProfilesSerivice: UserProfilesService) {}

  ngOnInit() {
    this.userProfilesSerivice.getUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res
      },
      err => {
        console.log(err)
      }
    )
  }
}
