import { Component } from '@angular/core';
import { Events, PopoverController } from 'ionic-angular';

import { HomePopoverPage } from "../home-popover/home-popover";
import { Stats } from "../../interfaces/stats";
import { UserData } from '../../providers/user-data';
import { UserInfo } from "../../interfaces/user-info";
import { UserApi } from "../../providers/user-api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userInfo: UserInfo;
  stats: Stats;

  constructor(public popoverCtrl: PopoverController, public events: Events,
              public userData: UserData, public userApi: UserApi) {
    this.events.subscribe('reload', () => {
      this.ionViewDidEnter();
    })
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(HomePopoverPage);
    popover.present({ ev: event });
  }

  ionViewDidEnter() {
    this.getStats();
  }

  getStats() {
    this.userData.getUser().then(user => {
      this.userInfo = user;
      this.userApi.getStats().then(stats => this.stats = stats);
    });
  }

  getPercent() {
    return Math.floor(this.stats.flow / this.userInfo.package * 100 >> 20)
  }

  login(event: Event) {
    this.userApi.login(this.userInfo.username, this.userInfo.password).catch(() => {});
  }

  logout(event: Event) {
    this.userApi.logout().catch(() => {});
  }

  doRefresh(event: Event) {
    this.getStats();
  }

  doRefresherRefresh(refresher) {
    this.getStats();
    refresher.complete();
  }


}
