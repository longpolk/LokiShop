import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-popup-cart",
  templateUrl: "./popup-cart.component.html",
  styleUrls: [
    //"./modals.less",
  "./module.scss.css"
]
})
export class PopupCartComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public openPopupCart() {

  }
  public closePopupCart(){
    document.getElementById('popup-cart').style.display = "none";
  }
}
