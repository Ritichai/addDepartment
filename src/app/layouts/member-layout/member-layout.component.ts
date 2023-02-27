import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-member-layout',
  templateUrl: './member-layout.component.html',
  styleUrls: ['./member-layout.component.scss']
})
export class MemberLayoutComponent implements OnInit {
  
  showFiller = false;
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });
  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    console.log();
  }
  events: string[] = [];
  // opened: boolean = true;

}
