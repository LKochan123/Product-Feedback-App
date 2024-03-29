import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Product-Feedback-App';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthenticaiton();
  }
}
