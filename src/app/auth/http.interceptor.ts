import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { AppVersion } from '@ionic-native/app-version'
import { Device } from '@ionic-native/device';
import { Platform } from 'ionic-angular';

import { Observable } from 'rxjs/Observable'

import { ENV } from './http.interface'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private appVersion: AppVersion, public platform: Platform, private device: Device) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let _env: ENV = new ENV()
    if(this.platform.is('core')){
      //application informations
      _env.appVersion = 'DEV_ENV_appVersion'
      _env.appName = 'DEV_ENV_appName'

      //user informations
      _env.userModel = 'DEV_ENV_userModel'
      _env.userPlatform = 'DEV_ENV_userPlatform'
      _env.userVersion = 'DEV_ENV_userVersion'
      _env.userManufacturer = 'DEV_ENV_userManufacturer'
    }
    else{
      //application informations
      this.appVersion.getVersionNumber().then( info => { _env.appVersion = info } )
      this.appVersion.getAppName().then( info => { _env.appName = info } )

      //user informations
      _env.userModel = this.device.model
      _env.userPlatform = this.device.platform
      _env.userVersion = this.device.version
      _env.userManufacturer = this.device.manufacturer   
    }

    // Clone the request to add the new header.
    const authReq = req.clone(
      { 
        headers: req.headers.set('headerName', 'headerValue')
                            .set('appEnv', JSON.stringify(_env))
      }
    )
    // Pass on the cloned request instead of the original request.
    console.log('intercepted', authReq.headers.get("appEnv"))

    return next.handle(authReq)

  }

}