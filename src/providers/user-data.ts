import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { UserInfo } from "../interfaces/user-info";

@Injectable()
export class UserData {

  constructor(public storage: Storage) {}

  setUser(user: UserInfo) {
    return this.storage.set('user', JSON.stringify(user));
  };

  getUser(): Promise<UserInfo> {
    return this.storage.get('user').then((value) => {
      if (!value) {
        let user = { username: '', password: '', package: 8 };
        this.setUser(user);
        return user;
      }
      else return JSON.parse(value);
    });
  };

}
