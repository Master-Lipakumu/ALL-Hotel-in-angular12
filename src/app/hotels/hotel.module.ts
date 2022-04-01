import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelRoutingModule } from './hotel-routing.module';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HotelData } from './shared/api/hotel.data';




@NgModule({
  declarations: [
    HotelDetailComponent,
    HotelListComponent,
    HotelEditComponent
  ],
  imports: [
    SharedModule,
    InMemoryWebApiModule.forFeature(HotelData),
    HotelRoutingModule
  ],

})
export class HotelModule { }
