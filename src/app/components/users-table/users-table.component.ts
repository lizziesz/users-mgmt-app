import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.users$ = this.usersService.users$;
  }

}
