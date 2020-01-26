import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { CreateNewUserComponent } from './components/create-new-user/create-new-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ConfirmDeleteUserComponent } from './components/confirm-delete-user/confirm-delete-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    CreateNewUserComponent,
    EditUserComponent,
    ConfirmDeleteUserComponent
  ],
  entryComponents: [
    CreateNewUserComponent,
    EditUserComponent,
    ConfirmDeleteUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
