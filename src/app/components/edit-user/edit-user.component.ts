import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  @Input() user: User;
  public editUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<EditUserComponent, any>
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
    console.log(this.editUserForm.value);
    if (this.editUserForm.value) {
      this.usersService.editUser$(this.editUserForm.value, this.user.id)
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  }

}
