import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User, Users, UserRequest } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly users$$ = new BehaviorSubject<User[]>([]);

  public get users$(): Observable<User[]> {
    return this.users$$.asObservable();
  }

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  public createUser$(newUser: UserRequest) {
    return this.http.post<User>(`${environment.api}/systemusers`, newUser).pipe(
      tap((newUserResponse) => {
        this.users$$.next([
          ...this.users$$.value,
          newUserResponse,
        ]);
      }),
      catchError((error) => {
        console.log('error', error);
        return of(null);
      }),
    );
  }

  public editUser$(newUser: UserRequest, userId: string) {
    return this.http.put<User>(`${environment.api}/systemusers/${userId}`, newUser).pipe(
      tap((newUserResponse) => {
        const usersToUpdate = this.users$$.getValue();
        const indexOfUpdatedUser = usersToUpdate.findIndex((user) => user.id === newUserResponse.id);
        if (indexOfUpdatedUser !== -1) {
          usersToUpdate.splice(indexOfUpdatedUser, 1, newUserResponse);
        }
        this.users$$.next([...usersToUpdate]);
      }),
      catchError((error) => {
        console.log('editUser error', error);
        return of(null);
      }),
    );
  }

  public deleteUser$(userId: string) {
    return this.http.delete<User>(`${environment.api}/systemusers/${userId}`).pipe(
      tap((deletedUser) => {
        const currentUsers = this.users$$.getValue();
        const updatedUsers = currentUsers.filter((user) => user.id !== deletedUser.id);
        this.users$$.next([...updatedUsers]);
      }),
      catchError((error) => {
        console.error('deleteUser error', error);
        return of(null);
      }),
    );
  }

  private getUsers() {
    this.http.get<Users>(`${environment.api}/systemusers`)
      .subscribe((users) => {
        console.log('users', users);
        this.users$$.next(users.results);
      });
  }
}
