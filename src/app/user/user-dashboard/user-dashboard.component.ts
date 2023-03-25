import { UsersService } from './../../services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {

  dataUsers: any[] = []


  constructor(private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.getMyUserinfo().subscribe((response: any) => {
      const data = response.data;
      this.dataUsers.push(data);
      console.log(this.dataUsers);
    });
  }
}
