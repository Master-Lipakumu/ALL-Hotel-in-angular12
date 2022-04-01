import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelEditComponent } from '../../hotel-edit/hotel-edit.component';



@Injectable({
  providedIn: 'root'
})
export class HotelEditGuard implements CanDeactivate<HotelEditComponent> {


  canDeactivate(component: HotelEditComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

      let url: string = state.url;
      console.log('Url: ' + url);

      if(component.hotelForm.dirty){

        //const hotelName:string = component.hotelForm.hotelName.get().value || 'nouveau'
        return confirm("voulez-vous annuler les changements effectués sur sur ce formulaire")
      }
    return true;
  }

}
