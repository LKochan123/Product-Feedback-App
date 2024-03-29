import { Component, ElementRef, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isOpened = false;
  closeIcon = '../../../assets/shared/mobile/icon-close.svg';
  hamburgerIcon = '../../../assets/shared/mobile/icon-hamburger.svg';

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.onCloseMenu(event);
  }

  onToggleNav() {
    this.isOpened = !this.isOpened;
    this.toggleBodyScrolling();
  }

  private toggleBodyScrolling() {
    const body = this.elementRef.nativeElement.ownerDocument.body;
    if (this.isOpened) {
      this.renderer.addClass(body, 'overflow-hidden');
    } else {
      this.renderer.removeClass(body, 'overflow-hidden');
    }
  }

  private onCloseMenu(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const backgroundShadow = this.elementRef.nativeElement.querySelector('.background-shadow');
    const menu = this.elementRef.nativeElement.querySelector('.menu');

    if (backgroundShadow && backgroundShadow.contains(target) && !menu.contains(target)) {
      this.isOpened = false;
      this.toggleBodyScrolling();
    }
  }
}
