import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';
import { CreateNewUserComponent } from '../create-new-user/create-new-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  users$: Observable<User[]>;
  displayedColumns: string[] = ['username', 'name', 'email', 'edit', 'delete'];

  constructor(private usersService: UsersService, private dialog: MatDialog) { }

  ngOnInit() {
    this.users$ = this.usersService.users$;
  }

  openCreateNewUserModal() {
    this.dialog.open(CreateNewUserComponent);
  }

  openEditUserModal(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent);
    dialogRef.componentInstance.user = user;
  }
}
