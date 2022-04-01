import { getNgModuleById } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Ihotel } from '../models/hotel';

export class HotelData implements InMemoryDbService {
  createDb(): Record<string,Ihotel[]>{
    const hotels:Ihotel[]=[
      {
        id:1,
        hotelname:"Fleuve Congo Hotel by Blazon Hotels",
        hoteldescription:"Hôtel haut de gamme avec vue sur fleuve, piscine extérieure, courts de tennis et 2 restaurants.",
        hotelprice: 230.5,
        hotelimage:"assets/image/hotel.jpg",
        rating: 4.2,
        tags:['New']

      },
      {
        id:2,
        hotelname:"Grand hôtel de Kinshasa",
        hoteldescription:"Situé à La Gombe, le quartier diplomatique de Kinshasa, cet hôtel d'affaires moderne et haut de gamme se trouve à 7 minutes à pied des berges du fleuve Congo et à 7 km du palais du Peuple",
        hotelprice: 230.5,
        hotelimage:"assets/image/hotel1.jpg",
        rating:3.5,
        tags:['New']

      },
      {
        id:3,
        hotelname:"Ixoras Hotel",
        hoteldescription:"Av.ixoras nº382, 7ème rue, C/Limeté Q/Résidentiel, Kinshasa, Congo-Kinshasa•+243 817 081 255",
        hotelprice: 230.5,
        hotelimage:"assets/image/hotel2.jpg",
        rating:2.5,
        tags:['New']

      },
      {
        id:4,
        hotelname:"Kin Plaza Arjaan by Rotana",
        hoteldescription:"Hôtel 5 étoiles B.P. 288, 1 Avenue De l'Uganda, Kinshasa, Congo-Kinshasa•+243 818 978 888",
        hotelprice: 230.5,
        hotelimage:"assets/image/hotel3.jpg",
        rating:1.5,
        tags:['New']

      }
    ];
    return { hotels };
  }

  genId(hotels:Ihotel[]):number{
    return hotels.length>0?Math.max(...hotels.map(hotel=>hotel.id))+1:1;
  }

}
