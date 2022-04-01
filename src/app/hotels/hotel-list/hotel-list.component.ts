import { Component, OnInit } from '@angular/core';
import { Hotel, Ihotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  public Title = 'All-Hotel';
  public errMsg!:string;


  public hotels:Ihotel[] = []

  constructor(private hotelListService:HotelListService) { }



  ngOnInit(): void {
    /*this.hotels = this.hotelListService.getHotels();*/
/*
a ce niveau nos hotel son emit depuis le fichier json grace a l'observable et http client
*/
    this.hotelListService.getHotels().subscribe({

      next:hotels=>{

        this.hotels=hotels,
        this.filteredHotels = this.hotels;

      },
      error:err=>this.errMsg=err,
      }
    )

    /*
    ##################################################################################
    reglage des filtre dans le cicle de vie  oninit
    ##################################################################################
     */

   this._hotelFilter = "";
  }

  /*
  ##########################################################################################
  reglage de l'envent biding au click
  ##########################################################################################
  */

  public showBadge:boolean = true;

  public toggleISNewBadge():void{
    this.showBadge=!this.showBadge;
  }

  /*
  ##########################################################################################
  champs de recherche configuration
  ##########################################################################################
  */
  private _hotelFilter = "";

  /*
  ###########################################################################################
  creation de la liste des filtre
  ###########################################################################################
   */

  public filteredHotels:Ihotel[]=[];

  /*
  ################################################################################################
  reglage de la recuperation du champ de recherche lecture seul
  #################################################################################################
   */

  public get hotelFilter():string{
    return this._hotelFilter;
  }


  /*
  ########################################################################################################
  reglage d'écriture du champ de recherche
  ###################################################################################################
   */

  public set hotelFilter(filter:string){
    this._hotelFilter = filter;
    this.filteredHotels = this.hotelFilter?this.filterHotels(this.hotelFilter):this.hotels;
  }

  private filterHotels(criteria:string):Ihotel[]{
    criteria = criteria.toLocaleLowerCase();
    const res = this.hotels.filter(
      (hotel:Ihotel)=>hotel.hotelname.toLocaleLowerCase().indexOf(criteria)!== -1);
        return res;
  }

/*
  ############################################################################
  configuration de l'affichage de l'arte des notes de l'étoile
  #########################################################################

*/

  public receiveRating!:string;

  public receiveRatingClicked(message:string):void{
    this.receiveRating=message;
  }

}
