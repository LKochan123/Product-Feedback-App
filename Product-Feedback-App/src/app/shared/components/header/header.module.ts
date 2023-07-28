import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './casual-header/header.component';
import { RouterModule } from '@angular/router';

import { SuggestionHeaderComponent } from './suggestion-header/suggestion-header.component';
import { LoginButtonComponent } from '../buttons/login-button/login-button.component';
import { DropdownMenuComponent } from '../buttons/dropdown-menu/dropdown-menu.component';

@NgModule({
  declarations: [HeaderComponent, SuggestionHeaderComponent],
  imports: [CommonModule, RouterModule, LoginButtonComponent, DropdownMenuComponent],
  exports: [HeaderComponent, SuggestionHeaderComponent],
})
export class HeaderModule {}
