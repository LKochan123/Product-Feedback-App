import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable, map } from 'rxjs';
import { User } from '../models/interfaces/user.model';
import { environemnt } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser$ = new Subject<string | null>();
  private _isAuthenticated = false;
  private _currentUserID!: string | null;
  private _token!: string;
  private tokenTimer!: any;
  private url = environemnt.apiUrl + 'user/';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  get token() {
    return this._token;
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  get currentUserID() {
    return this._currentUserID;
  }

  getCurrentUser$(): Observable<string | null> {
    return this.currentUser$.asObservable();
  }

  getCurrentUserRole() {
    return this.getUserById(this.currentUserID!).pipe(map(res => res.user.role));
  }

  getUserById(id: string) {
    return this.http.get<{ message: string; user: User }>(this.url + id);
  }

  getUserByIDs(ids: string[]) {
    const query = `?ids=${ids.join(',')}`;
    return this.http.get<{ message: string; users: User[] }>(this.url + 'multiple' + query);
  }

  signUp(username: string, email: string, password: string) {
    const user = { username, email, password };
    this.http.post(this.url + 'signup', user).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  logIn$(username: string, password: string) {
    const user = { username, password };

    this.http
      .post<{ id: string; token: string; expiresIn: number }>(this.url + 'login', user)
      .pipe(
        map(response => {
          this._token = response.token;
          if (this.token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);

            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

            this._isAuthenticated = true;
            this._currentUserID = response.id;
            this.currentUser$.next(username);
            this.saveDataInLocalStorage(this.token, expirationDate, username, this._currentUserID);
          }
        })
      )
      .subscribe(() => this.router.navigate(['/']));
  }

  logOut() {
    this._isAuthenticated = false;
    this._currentUserID = null;
    this.currentUser$.next(null);
    this.clearLocalStorage();
    clearTimeout(this.tokenTimer);
  }

  autoAuthenticaiton() {
    const authoDetails = this.getLocalStorage();
    if (!authoDetails) {
      return;
    }
    const now = new Date();
    const expiresIn = authoDetails.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this._isAuthenticated = true;
      this._currentUserID = authoDetails.userID;
      this._token = authoDetails!.token;
      this.setAuthTimer(expiresIn / 1000);
      this.currentUser$.next(authoDetails.username);
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }

  private saveDataInLocalStorage(
    token: string,
    expirationDate: Date,
    username: string,
    id: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('username', username);
    localStorage.setItem('userID', id);
  }

  private clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('username');
    localStorage.removeItem('userID');
  }

  private getLocalStorage() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const username = localStorage.getItem('username');
    const userID = localStorage.getItem('userID');

    if (token && expirationDate && username && userID) {
      return {
        token: token,
        expirationDate: new Date(expirationDate),
        username: username,
        userID: userID,
      };
    } else {
      return;
    }
  }
}
