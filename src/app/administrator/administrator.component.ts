import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css',
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
export class AdministratorComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService) { }
  
  login(id: string, password: string): void {
  id = id.trim();
  password = password.trim();
  if (!id) { return; }
  //this.userService.userLogin(id, password);
}
  ngOnInit() {
  }

}
