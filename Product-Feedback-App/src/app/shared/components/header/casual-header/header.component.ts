import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() currentPage!: string;
  @Input() headerTitle!: string;
  isUserAuthenticated = this.authService.isAuthenticated;

  constructor(private authService: AuthService) {}
}
