import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
/*import { nextTick } from 'process';
import { Observable } from 'rxjs';*/

@Injectable({
  providedIn: 'root'
})
export class HotelDetailGuard implements CanActivate {

  constructor(

    private router:Router

  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      /*  la constant est un nombre */

      const id = +route.url[1].path;

      /* si id n'est pas un nombre cree une alerte et va dans la liste d'hotel   */

      if(isNaN(id)||id <= 0){

        alert('hotel est inconnu');

        this.router.navigate(['/hotels']);

        return false;

      }

    return true;
  }

}
