import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserRoleEnum } from 'src/app/models/enums/user-role';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackFormComponent } from '../../feedback-form/feedback-form.component';

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
    private dialog: MatDialog
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
    this.dialog.open(FeedbackFormComponent, {
      minWidth: '300px',
      data: {
        isEditingPost: false,
        id: null,
      },
    });
  }

  ngOnDestroy() {
    this.isModeratorSub.unsubscribe();
  }
}
