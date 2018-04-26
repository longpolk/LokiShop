import { Phone } from "./phone";
import { Timestamp } from "rxjs/operators/timestamp";

export class Order {
  id: string;
  products: Phone[];
  customerName: string;
  customerAddress: string;
  customerPhone: number;
  customerEmail: string;
  customerTaxCode: string;
  customerCity: string;
  customerDistrict: string;
  customerWard: string;
  totalCost: number;
  currentCost: number;
  createdDate: Date;
  description: string;

  constructor(
    _id: string,
    _product: Phone[],
    _customerName: string,
    _customerAddress: string,
    _customerPhone: number,
    _customerEmail: string,
    _customerTaxCode: string,
    _customerCity: string,
    _customerDistrict: string,
    _customerWard: string,
    _totalCost: number,
    _currentCost: number,
    _description: string
  ) {}
}
