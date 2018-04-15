import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { WiFiApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HomePopoverPage } from "../pages/home-popover/home-popover";
import { AboutPage } from "../pages/about/about";
import { UserPage } from "../pages/user/user";
import { UserData } from "../providers/user-data";
import { UserApi } from "../providers/user-api";
import { WavePage } from "../pages/wave/wave";

@NgModule({
  declarations: [
    WiFiApp,
    HomePage,
    HomePopoverPage,
    AboutPage,
    UserPage,
    WavePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(WiFiApp, {}, {
      links: [ { component: AboutPage, name: 'AboutPage', segment: 'about' },
        { component: UserPage, name: 'UserPage', segment: 'user' } ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [ IonicApp ],
  entryComponents: [
    WiFiApp,
    HomePage,
    HomePopoverPage,
    AboutPage,
    UserPage,
    WavePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserData,
    UserApi,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
