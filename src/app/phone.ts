import { Timestamp } from "rxjs/operators/timestamp";

export class Phone {

  brand: string;
  category_id: string;
  colors: Array<string>;
  id: string;
  imageUrl: Array<string>;
  inStock: number;
  name: string;
  postDate: string;
  price: number;
  sale_price: number;
  snippet: string;
  sold: number;
  thumb: string;
  added: boolean;
  qtyinCart: number;
  selectedColor: string;
  index: number;
  category: string;

  constructor(){

  }
}
