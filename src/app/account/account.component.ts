import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css',
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
export class AccountComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

}
