import { NgModule} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';


/*mes importation modules*/

/*import { AngularFontAwesomeModule } from 'angular-font-awesome';*/


import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';

import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';

import { HotelModule } from './hotels/hotel.module';

import { AppRoutingModule } from './app-routing.module';

/*import { HotelListComponent } from './hotel-list/hotel-list.component';

import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';*/

registerLocaleData(localeFr,'fr');


@NgModule({
  declarations: [
    AppComponent,
    /*HotelDetailComponent,
    HotelListComponent,*/
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    HotelModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {  }
