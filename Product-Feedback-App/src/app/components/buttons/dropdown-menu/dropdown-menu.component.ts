import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html'
})
export class DropdownMenuComponent {

    showDropdown = false;

    constructor(private authService: AuthService) { }

    onShowDropdown() {
        this.showDropdown = !this.showDropdown;
    }

    onLogout() {
        this.authService.logOut();
    }
}