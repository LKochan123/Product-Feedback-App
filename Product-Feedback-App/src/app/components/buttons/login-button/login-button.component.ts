import { Component } from '@angular/core';

@Component({
    selector: 'app-login-button',
    template: `
    <button
        routerLink="/login" 
        type="button" 
        class="flex items-center text-sm md:text-base
        text-white bg-purple px-3 md:px-4 py-2 rounded-md
        hover:opacity-80 transition-opacity duration-300">
        <i class="text-xs fa-solid fa-arrow-right-to-bracket"></i>
        <p class="pl-2">Login</p>
    </button>
    `
})
export class LoginButtonComponent {
    
}