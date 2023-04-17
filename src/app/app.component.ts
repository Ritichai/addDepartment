import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FrontendV2';
  backUrl: any = [];
  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((val: any) => {
      if (val instanceof RoutesRecognized) {
        if (val.state.url == '/login') {
          localStorage.removeItem('backUrl');
        }

        if (localStorage.getItem('backUrl') == null) {
          localStorage.setItem('backUrl', JSON.stringify({ currentURL: '', previousURL: '' }));
        }

        let temp: any = localStorage.getItem('backUrl');
        this.backUrl = JSON.parse(temp.toString());
        this.backUrl.previousURL = this.backUrl.currentURL;
        this.backUrl.currentURL = val.state.url;
        localStorage.setItem('backUrl', JSON.stringify(this.backUrl));

      }
    });
  }

  ngOnInit(): void {
    // Swal.fire('Hello world!');
  }
}
