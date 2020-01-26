import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User, Users, NewUser } from '../models/User';

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

  createUser$(newUser: NewUser) {
    console.log('createUser', newUser)
    return this.http.post<User>(`${environment.api}/systemusers`, newUser).pipe(
      tap((newUserResponse) => {
        console.log(newUserResponse);
        this.getUsers();
      }),
      catchError((error) => {
        console.log('error', error);
        return of(null);
      }),
    );
  }

  private getUsers() {
    this.http.get<Users>(`${environment.api}/systemusers`).subscribe((users) => {
      console.log('users', users);
      this.users$$.next(users.results);
    });
  }
}
