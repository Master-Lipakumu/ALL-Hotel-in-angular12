import { NgModule } from '@angular/core';

import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelDetailGuard } from './shared/guards/hotel-detail.guard';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { HotelEditGuard } from './shared/guards/hotel-edit.guard';



const routes : Routes = [
  { path: 'hotels/:id',component : HotelDetailComponent, canActivate:[HotelDetailGuard]},
  { path: 'hotels',component : HotelListComponent },
  { path: 'hotels/:id/edit',component : HotelEditComponent, canDeactivate:[HotelEditGuard] },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [ RouterModule ],
})
export class HotelRoutingModule { }
