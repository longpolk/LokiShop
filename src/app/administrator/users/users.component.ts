import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Order } from '../../order';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css',
  "../base.scss.css",
  "../responsive.scss.css",
  "../bootstrap.css",
  "../themify-icons.css",
  "../bootstrap.min.css",
  "../font-awesome.min.css",
  "../style.scss.css",
  "../module.scss.css",
  "../bpr-products-module.css",
  "../main.min.css"
]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  order: Order[] = [];
  
  constructor(
    private userService: UserService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.users = this.getAllUsers();
  }

  getAllUsers(): User[] {
    let users = [];
    this.userService.getUsers().subscribe(data => {
      data.forEach(user => {
        if(user["data"].role != "admin")
        users.push(user);
      });
    });
    console.log(users);
    return users;
  }

  confirmDelete(user: User) {
    if (confirm("Bạn có thực sự muốn xóa người dùng này khỏi hệ thống?")) {
      console.log(user);
      this.deleteUser(user);
      return true;
    } else {
      return false;
    }
  }
  deleteUser(user: User) {
    console.log(user);
    this.userService.deleteUser(user);
    alert("Đã xóa người dùng khỏi hệ thống!");
  }


  confirmBlock(user: User) {
    if (confirm("Bạn có thực sự muốn khóa người dùng này?")) {
      console.log(user);
      this.blockUser(user);
      return true;
    } else {
      return false;
    }
  }
  blockUser(user: User) {
    console.log(user);
    this.userService.deleteUser(user);
    alert("Đã khóa người dùng!");
  }
}
