import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserRoleEnum } from 'src/app/models/enums/user-role';

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html'
})
export class DropdownMenuComponent implements OnInit, OnDestroy {

    username!: string;
    isModeratorSub!: Subscription;
    isModerator = false;
    showDropdown = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.username = localStorage.getItem('username')!;
        this.isModeratorSub = this.authService.getCurrentUserRole().subscribe(role => {
            this.isModerator = role === UserRoleEnum.ADMIN || role === UserRoleEnum.MODERATOR;
        });
    }

    onShowDropdown() {
        this.showDropdown = !this.showDropdown;
    }

    onLogout() {
        this.authService.logOut();
    }

    ngOnDestroy(): void {
        this.isModeratorSub.unsubscribe();
    }
}