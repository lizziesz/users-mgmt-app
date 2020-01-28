import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @Input() user: User;
  public editUserForm: FormGroup;
  public submitting = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<EditUserComponent, any>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.editUserForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      username: [this.user.username, [Validators.required]],
      firstname: [this.user.firstname],
      lastname: [this.user.lastname],
    });
  }

  editUser() {
    if (this.editUserForm.valid) {
      this.submitting = true;
      this.usersService.editUser$(this.editUserForm.value, this.user.id)
        .subscribe(() => {
          this.submitting = false;
          this.closeModal();
        }, (error) => {
          this.submitting = false;
          this.snackBar.open(`${error.error}`, null, { duration: 3000 });
        });
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
