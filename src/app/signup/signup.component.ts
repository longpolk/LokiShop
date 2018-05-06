import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: [
    "./signup.component.css",
    "/base.scss.css",
    "./responsive.scss.css",
    "./bootstrap.css",
    "./themify-icons.css",
    "./bootstrap.min.css",
    "./font-awesome.min.css",
    "./style.scss.css",
    "./module.scss.css",
    "./bpr-products-module.css"
  ]
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService) {}

  signup(lastName: string, firstName: string, email: string, password: string) {
    if (
      lastName.toLowerCase().trim() !== null &&
      lastName.toLowerCase().trim() !== "" &&
      firstName.toLowerCase().trim() !== null &&
      firstName.toLowerCase().trim() !== '' &&
      email.toLowerCase().trim() !== null &&
      email.toLowerCase().trim() !== '' &&
      password.toLowerCase().trim() !== null &&
      password.toLowerCase().trim() !== ''
    ) {
      this.userService.addUser(email, lastName + " " + firstName, password);
    } else {
      alert("Thông tin nhập chưa đúng");
    }
  }
  ngOnInit() {}
}
