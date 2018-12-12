import { Component, OnInit, Input } from '@angular/core';
import { VoucherService } from '../../services/voucher.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Voucher } from '../../voucher';

@Component({
  selector: 'app-voucher-update',
  templateUrl: './voucher-update.component.html',
  styleUrls: ['./voucher-update.component.css',
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
export class VoucherUpdateComponent implements OnInit {
  @Input() voucher: Voucher;
  constructor(
    private voucherService: VoucherService,
    private route: ActivatedRoute,
    public location: Location
  ) { }

  ngOnInit() {
    this.getVoucher();
  }

  getVoucher(): void {
    this.route.params.subscribe(params => {
	  const id = params['id'];
      this.voucherService
        .getVoucher(id)
        .subscribe(_ => this.voucher = _)
    });
  }

}
