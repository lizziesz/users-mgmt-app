import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss']
})
export class CreateNewUserComponent implements OnInit  {
  public createUserForm: FormGroup;
  public submitting = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<CreateNewUserComponent, any>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.createUserForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required]],
      firstname: [null],
      lastname: [null],
    });
  }

  createUser() {
    if (this.createUserForm.valid) {
      this.submitting = true;
      this.usersService.createUser$(this.createUserForm.value)
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
