import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';
import { CreateNewUserComponent } from '../create-new-user/create-new-user.component';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  users$: Observable<User[]>;
  displayedColumns: string[] = ['username', 'email'];

  constructor(private usersService: UsersService, private dialog: MatDialog) { }

  ngOnInit() {
    this.users$ = this.usersService.users$;
  }

  openCreateNewUserModal() {
    console.log('open???')
    this.dialog.open(CreateNewUserComponent);
  }
}
