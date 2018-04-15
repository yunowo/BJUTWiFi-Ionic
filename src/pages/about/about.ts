import { Component } from '@angular/core';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor() {}

  openGitHub() {
    window.open('https://github.com/yunv/BJUTWiFi-Ionic', '_blank');
  }
}
