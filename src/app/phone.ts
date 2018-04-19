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

  constructor(_brand: string, _category_id: string, _colors: Array<string> , _id: string, _imageUrl: Array<string>, _inStock: number, _name: string, 
    _postDate: string, _price: number, _sale_price: number, _snippet: string, _sold: number, _thumb: string, _added: boolean){
      
  }
}
