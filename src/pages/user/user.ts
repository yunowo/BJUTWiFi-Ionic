import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { UserInfo } from "../../interfaces/user-info";
import { UserData } from "../../providers/user-data";

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  userInfo: UserInfo;

  constructor(public navCtrl: NavController, public userData: UserData, public events: Events,) {}

  ionViewDidEnter() {
    this.getUser();
  }

  getUser() {
    this.userData.getUser().then(user => this.userInfo = user);
  }

  saveUser(event: Event) {
    this.userData.setUser(this.userInfo).then(() => {
      this.events.publish('reload');
    });
    this.navCtrl.pop();
  }
}
