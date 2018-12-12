export class Voucher {
    id: string;
    data : {
      id: string,
      discount: number,
      name: string,
      expired: boolean,
      endDate: string,
      startDate: string,
      inStock: number
      };
  }