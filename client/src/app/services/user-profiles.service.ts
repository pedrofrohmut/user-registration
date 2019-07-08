import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"

const SERVER_URL = "http://localhost:5000"
const USER_PROFILES_URL = `${SERVER_URL}/api/userprofiles`

@Injectable({
  providedIn: "root"
})
export class UserProfilesService {
  constructor(private http: HttpClient) {}

  getUserProfile() {
    // const token = localStorage.getItem("token")
    // const headers = new HttpHeaders({ Authorization: `Bearer ${token}` })
    return this.http.get(`${USER_PROFILES_URL}`)
  }
}
