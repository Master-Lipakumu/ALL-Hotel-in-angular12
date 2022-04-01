export interface Ihotel{
    id:number;
    hotelname:string;
    hoteldescription:string;
    hotelprice: number;
    hotelimage:string;
    rating:number;
    tags?:string[];
}

export class Hotel implements Ihotel{
  constructor(
    public id: number,
    public hotelname: string,
    public hoteldescription: string,
    public hotelprice: number,
    public hotelimage: string,
    public rating: number,
    public tags: string[]
  ){

  }
}
