import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isOpened = false;
  closeIcon = '../../../assets/shared/mobile/icon-close.svg';
  hamburgerIcon = '../../../assets/shared/mobile/icon-hamburger.svg';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  onToggleNav() {
    this.isOpened = !this.isOpened;
    this.toggleBodyScrolling();
  }

  toggleBodyScrolling() {
    const body = this.elementRef.nativeElement.ownerDocument.body;
    if (this.isOpened) { 
      this.renderer.addClass(body, 'overflow-hidden');
    } else {
      this.renderer.removeClass(body, 'overflow-hidden');
    }
  }
}
