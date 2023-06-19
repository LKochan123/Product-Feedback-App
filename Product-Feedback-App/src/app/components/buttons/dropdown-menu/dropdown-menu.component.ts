import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html'
})
export class DropdownMenuComponent implements OnInit {

    username!: string | null;
    showDropdown = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.username = localStorage.getItem('username');
    }

    onShowDropdown() {
        this.showDropdown = !this.showDropdown;
    }

    onLogout() {
        this.authService.logOut();
    }
}