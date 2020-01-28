import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDeleteUserComponent } from '../confirm-delete-user/confirm-delete-user.component';
import { CreateNewUserComponent } from '../create-new-user/create-new-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

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
    this.dialog.open(CreateNewUserComponent, {
      height: '50vh',
      width: '50vw',
    });
  }

  openEditUserModal(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      height: '50vh',
      width: '50vw',
    });
    dialogRef.componentInstance.user = user;
  }

  openConfirmDeleteModal(user: User) {
    const dialogRef = this.dialog.open(ConfirmDeleteUserComponent);
    dialogRef.componentInstance.user = user;
  }
}
