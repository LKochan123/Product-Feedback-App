import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable, map } from 'rxjs'
import { User } from '../models/user.model';
import { UserRoleEnum } from '../models/enums/user-role';
import { UserStatusEnum } from '../models/enums/user-status';

@Injectable({ 
    providedIn: 'root'
})
export class AuthService {

    private isAuthenticated = false;
    private currentUser$ = new Subject<string | null>();
    private currentUserID!: string | null;
    private token!: string;
    private tokenTimer!: any;
    private url = 'http://localhost:3000/user/';

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

    getCurrentUserID() {
        return this.currentUserID;
    }

    getCurrentUserRole() {
        return this.getUserById(this.currentUserID!).pipe(
            map(res => res.user.role)
        );
    }

    getUserById(id: string) {
        return this.http.get<{message: string, user: User}>(this.url + id);
    }

    getUserByIDs(ids: string[]) {
        const query = `?ids=${ids.join(',')}`;
        return this.http.get<{message: string, users: User[]}>(this.url + 'multiple' + query);
    }

    getUsersByStatus(status: UserStatusEnum) {
        const query = `?status=${status}`;
        return this.http.get<{message: string, users: User[], occurance: number}>(this.url + query);
    }

    signUp(username: string, email: string, password: string) {
        const user = {
            username: username,
            email: email,
            password: password
        };

        this.http.post(this.url + 'signup', user).subscribe(response => {
            this.router.navigate(['/login']);
        });
    }

    logIn$(username: string, password: string) {
        const user = {
            username: username,
            password: password
        };

        return this.http.post<{id: string, token: string, expiresIn: number}>(this.url + 'login', user).pipe(
            map(response => {
                this.token = response.token;
                if (this.token) {
                    const expiresInDuration = response.expiresIn;
                    this.setAuthTimer(expiresInDuration);

                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);

                    this.isAuthenticated = true;
                    this.currentUserID = response.id;
                    this.currentUser$.next(username);
                    this.saveDataInLocalStorage(this.token, expirationDate, username, this.currentUserID);
                }
            })
        )
    }

    logOut() {
        this.isAuthenticated = false;
        this.currentUserID = null;
        this.currentUser$.next(null);
        this.clearLocalStorage();
        clearTimeout(this.tokenTimer);
    }

    banUser(id: string) {
        const status = { status: UserStatusEnum.BANNED }
        this.http.patch<{message: string}>(this.url + 'status/' + id, status).subscribe();
    }

    unbanUser(id: string) {
        const status = { status: UserStatusEnum.ACTIVE }
        this.http.patch<{message: string}>(this.url + 'status/' + id, status).subscribe();
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
            this.currentUserID = authoDetails.userID;
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

    private saveDataInLocalStorage(token: string, expirationDate: Date, username: string, id: string) {
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
                userID: userID
            }
        } else {
            return;
        }
    }
}