import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserRoleEnum } from 'src/app/shared/models/enums/user-role';
import { FeedbackService } from 'src/app/feedbacks/services/feedback.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
})
export class DropdownMenuComponent implements OnInit, OnDestroy {
  username!: string;
  isModeratorSub!: Subscription;
  isModerator = false;
  showDropdown = false;

  constructor(
    private authService: AuthService,
    private feedbackService: FeedbackService
  ) {}

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

  onAddFeedback() {
    this.feedbackService.openDialog(null);
  }

  ngOnDestroy() {
    this.isModeratorSub.unsubscribe();
  }
}
