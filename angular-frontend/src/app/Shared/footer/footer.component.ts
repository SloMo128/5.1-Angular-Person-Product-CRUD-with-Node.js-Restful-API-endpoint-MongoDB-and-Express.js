import { Component } from '@angular/core';

@Component({
  selector: 'app-root-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  title = 'angular';

  collapsed: boolean = true;
}