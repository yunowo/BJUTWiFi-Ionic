import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';

import { Stats } from "../interfaces/stats";


@Injectable()
export class UserApi {

  constructor(public http: HttpClient,) {}

  login(username, password) {
    return this.http.post('https://wlgn.bjut.edu.cn/', {
      'DDDDD': username,
      'upass': password,
      'R6': '1',
      '6MKKey': '123',
    }).toPromise();
  }

  logout() {
    return this.http.get('https://wlgn.bjut.edu.cn/F.htm').toPromise();
  }


  getStats(): Promise<Stats> {
    return this.http.get('https://wlgn.bjut.edu.cn/1.htm')
      .map(UserApi.parseStats, this).toPromise()
      .then(stats => stats)
      .catch(() => ({ fee: 0, flow: 0, time: 0, flowFormatted: UserApi.formatSize(0) }));
  };

  static parseStats(text: String): Stats {
    const p = RegExp("time='(.*?)';flow='(.*?)';fsele=1;fee='(.*?)'");
    let r = p.exec(text.replace(' ', ''));
    return {
      time: Number(r[1]),
      flow: Number(r[2]),
      fee: Number(r[3]) / 10000,
      flowFormatted: this.formatSize(Number(r[2]) * 1024)
    };
  }

  static formatSize(bytes: number) {
    if (bytes == 0) return '0 Bytes';
    const k = 1024, dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

}
