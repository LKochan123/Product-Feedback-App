import { Component } from '@angular/core';

//Wydzielanie buttona w ten sposob mija sie z celem. Chyba, ze serio masz X miejsc, ktore potrzebuja tego kodu :D
@Component({
  selector: 'app-login-button',
  template: `
    <button
      routerLink="/auth/login"
      type="button"
      class="flex items-center text-sm md:text-base text-white bg-purple px-3 md:px-4 py-2 rounded-md hover:opacity-80 transition-opacity duration-300">
      <i class="text-xs fa-solid fa-arrow-right-to-bracket"></i>
      <p class="pl-2">Login</p>
    </button>
  `,
})
export class LoginButtonComponent {}
