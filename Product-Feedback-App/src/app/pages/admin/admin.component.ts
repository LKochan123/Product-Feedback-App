import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit {

    users$!: Observable<{users: User[], occurance: number}>;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        
    }
}