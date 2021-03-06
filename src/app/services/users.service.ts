import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
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
        return throwError(error);
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
        return throwError(error);
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
        return throwError(error);
      }),
    );
  }

  private getUsers() {
    this.http.get<Users>(`${environment.api}/systemusers`)
      .subscribe((users) => {
        this.users$$.next(users.results);
      });
  }
}
