import { BrowserModule } from '@angular/platform-browser'
import { ErrorHandler, NgModule } from '@angular/core'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppVersion } from '@ionic-native/app-version'
import { Device } from '@ionic-native/device';


import { ApiInterceptor } from './auth/http.interceptor'

import { MyApp } from './app.component'
import { LoginPage } from '../pages/login/login'
import { HomePage } from '../pages/home/home'
import { ListPage } from '../pages/list/list'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { LoginProvider } from '../providers/login/login'

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    HttpClientModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    Device,
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    LoginProvider
  ]
})
export class AppModule {}
