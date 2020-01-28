import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-confirm-delete-user',
  templateUrl: './confirm-delete-user.component.html',
  styleUrls: ['./confirm-delete-user.component.scss']
})
export class ConfirmDeleteUserComponent implements OnInit {
  @Input() user: User;
  public deleting = false;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteUserComponent, any>,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

  deleteUser() {
    this.deleting = true;
    this.usersService.deleteUser$(this.user.id)
      .subscribe(() => {
        this.deleting = false;
        this.dialogRef.close();
      }, (error) => {
        this.deleting = false;
        this.snackBar.open(`${error.error}`, null, { duration: 3000 });
      });
  }

}
