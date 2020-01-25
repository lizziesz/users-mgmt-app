import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Users } from '../models/User';

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

  getUsers() {
    this.http.get<Users>(`${environment.api}/systemusers`).subscribe((users) => {
      console.log('users', users);
      this.users$$.next(users.results);
    });
  }
}
