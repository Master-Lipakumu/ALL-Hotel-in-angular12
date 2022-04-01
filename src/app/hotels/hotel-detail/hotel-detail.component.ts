import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ihotel } from 'src/app/hotels/shared/models/hotel';
import { HotelListService } from 'src/app/hotels/shared/services/hotel-list.service';


@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  hotel:Ihotel|undefined = <Ihotel>{};

  constructor(
    private route:ActivatedRoute,

    private hotelservice:HotelListService,

  /* reglage de la navigation sans utiliser le navbar mais dans un boutton du template*/
    private router:Router,



  ) { }

  ngOnInit(): void {

    /* reglage route id hotel detail*/

    const routeParams = this.route.snapshot.paramMap;

    const id:number = Number(routeParams.get('id'));

    /* reglage  de la recherche et recuperation d'hotel dans le detail*/

    this.hotelservice.getHotels().subscribe( (hotels:Ihotel[])=>{

      this.hotel = hotels.find( hotel => hotel.id === id );

    });
  }

  /* voici la fonction de retour a la liste du bouton detail */

  public backToList(): void {

    this.router.navigate(['/hotels']);

  }

}
