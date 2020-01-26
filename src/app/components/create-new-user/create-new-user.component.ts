import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss']
})
export class CreateNewUserComponent implements OnInit  {
  public createUserForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, private dialogRef: MatDialogRef<CreateNewUserComponent, any>) { }

  ngOnInit() {
    this.createUserForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required]],
    });
  }

  createUser() {
    console.log(this.createUserForm.value);
    if (this.createUserForm.valid) {
      this.usersService.createUser$(this.createUserForm.value).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

}
