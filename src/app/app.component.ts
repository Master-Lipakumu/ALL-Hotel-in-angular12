import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'All-Hotel';

  public Title = 'All-Hotel';

  public getDate(): Date{
    return new Date();
  }
}
