import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "../services/user.service";
import { AuthService } from "../core/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [
    "./login.component.css",
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
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  login(email: string, password: string) {
    if (
      email.toLowerCase().trim() !== null &&
      email.toLowerCase().trim() !== "" &&
      password.toLowerCase().trim() !== null &&
      password.toLowerCase().trim() !== ""
    ) {
      //this.userService.userLogin(email, password);
      this.authService.Login(email, password)
        .then(function () {
          if (email == "admin@lokishop.com") {
            console.log("Admin login successful ");
            window.location.href = "/";
          } else {
            console.log("Customer login successful ");
            window.location.href = "/";
          }
        })
        .catch(function (error) {
          switch (error.code) {
            case 'auth/wrong-password': alert("Sai mật khẩu"); break;
            case 'auth/user-not-found': alert("Tài khoản không tồn tại"); break;
          }
        });
    } else {
      alert("Vui lòng nhập email và mật khẩu");
    }
  }
  GoogleLogin() {
    this.authService.googleLogin()
      .then(function () {
        console.log("Login successful ");
        window.location.href = "/account";
      })
      .catch(function (error) {
        console.error("Error logging: ", error);
      });
  }
  ngOnInit() { }
}
