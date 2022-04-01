import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReplaceComma } from '../share/pipe/replace-comma.pipe';
import { StartRankingComponent } from '../share/start-ranking/start-ranking.component';



@NgModule({
  declarations: [
    ReplaceComma,
    StartRankingComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    ReplaceComma,
    StartRankingComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
