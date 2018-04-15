import { Component } from '@angular/core';

import { NavController, ModalController, ViewController} from 'ionic-angular';
import { UserPage } from "../user/user";


@Component({
  template: `
    <ion-list no-lines>
      <button ion-item (click)="modifyUser()">User</button>
      <button ion-item (click)="about()">About</button>
    </ion-list>
  `
})
export class HomePopoverPage {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public modalCtrl: ModalController) {}

  modifyUser() {
    let modal = this.modalCtrl.create(UserPage);
    modal.present();
    this.viewCtrl.dismiss();
  }

  about() {
    this.navCtrl.push('AboutPage');
    this.viewCtrl.dismiss();
  }

}
