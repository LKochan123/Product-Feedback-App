import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './casual-header/header.component';
import { RouterModule } from '@angular/router';
import { LoginButtonModule } from '../buttons/login-button/login-button.module';
import { DropdownMenuModule } from '../buttons/dropdown-menu/dropdown-menu.module';
import { SuggestionHeaderComponent } from './suggestion-header/suggestion-header.component';

@NgModule({
  declarations: [HeaderComponent, SuggestionHeaderComponent],
  imports: [CommonModule, RouterModule, LoginButtonModule, DropdownMenuModule],
  exports: [HeaderComponent, SuggestionHeaderComponent],
})
export class HeaderModule {}
