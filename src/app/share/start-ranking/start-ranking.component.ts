import { Component, OnChanges, OnInit, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-start-ranking',
  templateUrl: './start-ranking.component.html',
  styleUrls: ['./start-ranking.component.css']
})
export class StartRankingComponent implements OnChanges{


  public startwidth!: number;
  @Input()
  public rating:number = 2;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.startwidth = this.rating*125/5;

  }
/*
  ############################################################################
  afficher la note si on click sur les étoiles dépuis le père
  #########################################################################

*/
  @Output()
  public starRatingClicled:EventEmitter<string> = new EventEmitter<string>();


  public sendRating():void{
    this.starRatingClicled.emit(`result is ${this.rating}`)
  }

}
