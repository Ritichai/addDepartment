import { Component } from '@angular/core';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  backUrl: any = '';
  constructor() { 
    this.backUrl = localStorage.getItem('backUrl');
    this.backUrl = JSON.parse(this.backUrl);
    this.backUrl = this.backUrl.previousURL;
  }
}
