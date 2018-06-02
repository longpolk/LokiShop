import { Component, OnInit, Input, AfterContentInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Phone } from '../../phone';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PhoneService } from '../../services/phone.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CartService } from '../../services/cart.service';
import { Brand } from '../../brand';
import { Category } from '../../category';
import { UploadService } from '../../services/upload.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: [
    './product-add.component.css',
    './LokiShop-2018_files/bootstrap.min.css',
    './LokiShop-2018_files/font-awesome.min.css',
    './LokiShop-2018_files/owl.carousel.min.css',
    './LokiShop-2018_files/base.scss.css',
    './LokiShop-2018_files/style.scss.css',
    './LokiShop-2018_files/update.scss.css',
    './LokiShop-2018_files/module.scss.css',
    './LokiShop-2018_files/responsive.scss.css',
    './LokiShop-2018_files/update_stylesheets.scss.css',
    './LokiShop-2018_files/css.css',
    './LokiShop-2018_files/menu-stylesheets.scss.css',
    './LokiShop-2018_files/popup-cart.scss.css'
  ]
})
export class ProductAddComponent implements OnInit {
  @Input() phone: Phone;
  @Input() phones: Phone[];
  @Input() brands: Brand[];
  @Input() categories: Category[];
  @Input() mainImageUrl: string;

  @ViewChild("phoneName") phoneName: any;
  @ViewChild("phoneDes") phoneDes: any;
  @ViewChild("phonePrice") phonePrice: any;
  @ViewChild("phoneSalePrice") phoneSalePrice: any;
  @ViewChild("phoneInStock") phoneInStock: any;
  @ViewChild("phoneColors") phoneColors: any;
  @ViewChild("phoneBrand") phoneBrand: any;
  @ViewChild("phoneType") phoneType: any;
  @ViewChild("verify") verifyButton: any;
  @ViewChild("update") updateButton: any;
  @ViewChild("mainImage") mainImage: any;

  categoryName: Category[] = [];
  downloadURL: Observable<string>;
  imageUrl: Observable<string>;
  thumb: string;
  thumbChild: string;
  public enabled: number;
  public hidden: number;

  constructor(private route: ActivatedRoute,
    private phoneService: PhoneService,
    private location: Location,
    private cartService: CartService,
    private uploadService: UploadService) { }

  ngOnInit() {
    this.newPhone();
    this.getPhones();
    this.enabled = 1;
    this.hidden = 0;
    this.getCategories();
    this.getBrands();
  }
  
  newPhone(){
    this.phone = new Phone();
  }

  getPhones(): void {
    this.phoneService.getPhones()
        .subscribe(_ => this.phones = _);
  }
  getBrands(): void {
    this.phoneService.getBrands().subscribe(_ => this.brands = _);
  }
  getCategories(): void {
    this.phoneService.getCategories().subscribe(_ => this.categories = _);
  }
  goBack(): void {
    this.location.back();
  }
  updateForm(
    phoneName: string,
    phoneDes: string,
    phonePrice: number,
    phoneSalePrice: number,
    phoneInStock: number,
    phoneColors: Array<string>,
    phoneBrand: string,
    phone: Phone
  ): boolean {
    var name = phone.name.toLowerCase().split(" ");
    phone.name = '';
    for(var i =0;i<name.length;i++){
      if(i<name.length && i<name.length-1){
      phone.name = phone.name+name[i]+"-"
      }
      if(i == name.length-1){
      phone.name = phone.name+name[i];
      }
    }
    phone.id = phone.name;
    phone.name = phoneName;
    phone.snippet = phoneDes;
    phone.category_id = this.categoryName[0]["data"].id;
    phone.price = phonePrice;
    phone.sale_price = phoneSalePrice;
    phone.inStock = phoneInStock;
    var list = [];
    phoneColors = phoneColors.toString().split(',');
    for (var i = 0; i < phoneColors.length; i++) {
      list.push(phoneColors[i]);
    }
    phone.colors = list;
    phone.brand = phoneBrand;
    console.log(phone);
    console.log(this.categoryName[0]);
    this.phoneService.addPhone(phone, this.categoryName[0].id);
    alert("Đã lưu thông tin sản phẩm!");
    return true;
  }

  validateForm(catID: string): boolean {
    var formElement = [
      this.phoneName,
      this.phoneDes,
      this.phonePrice,
      this.phoneSalePrice,
      this.phoneInStock,
      this.phoneColors,
      this.phoneBrand,
      this.phoneType
    ];
    var count = 0;
    for (var i = 0; i < formElement.length; i++) {
      var element = formElement[i];
      if (element.invalid && (element.dirty || element.touched)) {
        if (
          (element.errors && element.errors.pattern)
        ) {
          count++;
        }
        count++;
      }
    }
    if (count !== 0) {
      alert("Lỗi! Vui lòng kiểm tra lại thông tin sản phẩm!");
      return false;
    } else {
      this.verifyButton.nativeElement.hidden = true;
      this.updateButton.nativeElement.hidden = false;
      this.getCategoryByName(catID);
      console.log(catID);
      alert("Thông tin sản phẩm hợp lệ!");
      return true;
    }
  }
  getCategoryByID(id: string) {
    this.phoneService.getCategoryByID(id).subscribe(_ => this.categoryName = _);
  }
  getCategoryByName(name: string) {
    this.phoneService.getCategoryByName(name).subscribe(_ => this.categoryName = _);
  }
  changeImage(catID: string) {
    this.hidden = 0;
    this.getCategoryByID(catID);
    console.log(catID);
  }
  startUpload(event: FileList) {
    this.uploadService.startUpload(event);
    this.downloadURL = this.uploadService.uploadTask.downloadURL();
    this.downloadURL.subscribe(_ => this.thumb = _);
  }
  /** Start replace value of phone's thumb */
  saveChangeImage(thumb: string) {
    console.log(thumb);
    this.uploadService.changeThumb(this.phone, this.categoryName[0]["data"].name, thumb);
    this.downloadURL = null;
  }
  startUploadChild(event: FileList) {
    this.uploadService.startUpload(event);
    this.imageUrl = this.uploadService.uploadTask.downloadURL();
    this.imageUrl.subscribe(_ => this.thumbChild = _);
    this.downloadURL = null;
  }
  /** Call the click event of Child upload */
  addImage(catID: string) {
    document.getElementById("newImage").click();
    this.getCategoryByID(catID);
    console.log(catID);
  }
  addImageUrl(thumb: string) {
    console.log(thumb);
    this.uploadService.addImageUrl(this.phone, this.categoryName[0]["data"].name, thumb);
    this.imageUrl = null;
    alert("Thêm ảnh sản phẩm thành công!");
  }
  callAddImageByURL(catID: string) {
    this.getCategoryByID(catID);
    console.log(catID);
  }
  addImageByURL(event: any, url: string) {
    if (event.keyCode == 13) {
      url = url.toString().trim();
      if (url == null || url == '') {
        alert('Vui lòng nhập đúng URL!');
        return;
      } else {
        this.uploadService.addImageUrl(this.phone, this.categoryName[0]["data"].name, url);
      }
    } else {
    }
  }
  deleteImageUrl(url: string) {
    this.uploadService.deleteImageUrl(this.phone, this.categoryName[0]["data"].name, url);
  }
  getBrandID(): number {
    var max = parseInt(this.brands[0].id.replace("brand-", ""));
    for (var i = 0; i < this.brands.length; i++) {
      var temp = parseInt(this.brands[i].id.replace("brand-", ""));
      if (temp > max) {
        max = temp;
      }
    }
    return (max + 1);
  }
  getCategoryID(): number {
    var max = parseInt(this.categories[0]["data"].id.replace("cat-", ""));
    for (var i = 0; i < this.categories.length; i++) {
      var temp = parseInt(this.categories[i]["data"].id.replace("cat-", ""));
      if (temp > max) {
        max = temp;
      }
    }
    return (max + 1);
  }
  addBrand(name: string) {
    var d = 0;
    console.log(this.brands);
    for (var i = 0; i < this.brands.length; i++) {
      if (this.brands[i]["data"].name.toLowerCase() == name.toLowerCase()) {
        d++;
      }
    }
    if (d == 0) {
      var id = "brand-" + this.getBrandID().toString();
      this.phoneService.addBrand(id, name, true, "placeholder");
      alert("Thêm nhãn hiệu thành công");
    } else {
      alert("Nhãn hiệu này đã tồn tại");
    }
  }
  addCategory(name: string, description: string) {
    var d = 0;
    for (var i = 0; i < this.categories.length; i++) {
      if (this.categories[i]["data"].name.toLowerCase() == name.toLowerCase() || this.categories[i]["data"].description.toLowerCase() == description.toLowerCase()) {
        d++;
      }
    }
    if (d == 0) {
      var sid = "cat-" + this.getCategoryID().toString();
      this.phoneService.addCategory(name.toLowerCase().replace(' ',''), sid, name.toLowerCase().replace(' ',''), description);
      alert("Thêm loại sản phẩm thành công");
    } else {
      alert("Loại sản phẩm này đã tồn tại");
    }
  }
}
