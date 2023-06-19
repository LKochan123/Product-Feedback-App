import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Subject, Observable } from 'rxjs'

@Injectable({ 
    providedIn: 'root'
})
export class AuthService {

    private isAuthenticated = false;
    private currentUser$ = new Subject<string | null>();
    private token!: string;
    private tokenTimer!: any;
    private url = 'http://localhost:3000/user';

    constructor(private http: HttpClient, private router: Router) { }

    getToken() {
        return this.token;
    }

    getIsAuthenticated() {
        return this.isAuthenticated;
    }

    getCurrentUser$(): Observable<string | null> {
        return this.currentUser$.asObservable();
    }

    signUp(username: string, email: string, password: string) {
        const user = {
            username: username,
            email: email,
            password: password
        };

        this.http.post(this.url + '/signup', user).subscribe(response => {
            this.router.navigate(['/login']);
        });
    }

    logIn(username: string, password: string) {
        const user = {
            username: username,
            password: password
        };

        this.http.post<{token: string, expiresIn: number}>(this.url + '/login', user).subscribe(response => {
            this.token = response.token;
            if (this.token) {
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);

                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

                this.isAuthenticated = true;
                this.currentUser$.next(username);
                this.saveDataInLocalStorage(this.token, expirationDate, username);
                this.router.navigate(['/']);
            }
        });
    }

    logOut() {
        this.isAuthenticated = false;
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
            this.isAuthenticated = true;
            this.token = authoDetails!.token;
            this.setAuthTimer(expiresIn / 1000);
            this.currentUser$.next(authoDetails.username);
        }
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logOut();
        }, duration * 1000);
    }

    private saveDataInLocalStorage(token: string, expirationDate: Date, username: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('username', username);
    }

    private clearLocalStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('username');
    }

    private getLocalStorage() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const username = localStorage.getItem('username');

        if (token && expirationDate && username) {
            return {
                token: token,
                expirationDate: new Date(expirationDate),
                username: username
            }
        } else {
            return;
        }
    }
}