import { Phone } from "./phone";

export class Order {
  
  id: string;
  product: Phone[];
  customerName: string;
  customerAddress: string;
  customerPhone: number;
  customerEmail: string;
  coupon: number;
  discount: number;
  description: string;

  constructor(_id: string,
    _product: Phone[],
    _customerName: string,
    _customerAddress: string,
    _customerPhone: number,
    _customerEmail: string,
    _coupon: number,
    _discount: number,
    _description: string){
      
  }
}