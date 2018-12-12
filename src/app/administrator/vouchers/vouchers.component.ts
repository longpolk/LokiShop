import { Component, OnInit } from '@angular/core';
import { Voucher } from '../../voucher';
import { Location } from "@angular/common";
import { Observable } from "rxjs/observable";
import { VoucherService } from '../../services/voucher.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.css',
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
export class VouchersComponent implements OnInit {
  vouchers: Voucher[] = [];
  constructor(
    private voucherService: VoucherService,
    private route: ActivatedRoute,
    public location: Location
  ) { }

  ngOnInit() {
    this.getVouchers();
  }

  getVouchers(){
    this.voucherService.getVouchers()
      .subscribe(vouchers => this.vouchers = vouchers);
      //console.log('list accessories: ');
      //console.log(this.accessories);
  }

}
