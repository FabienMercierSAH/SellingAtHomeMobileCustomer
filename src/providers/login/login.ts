import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core'

import { CONFIG } from '../../app/app.constants'

@Injectable()
export class LoginProvider {

	constructor(public http: HttpClient ) { }

	private extractData(res: Response) {
		let body = res.json()
		return body || { }
	}

	private handleError (error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const err = error || ''
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`
		} 
		else {
			errMsg = error.message ? error.message : error.toString()
		}

		console.error(errMsg)
		return Observable.throw(errMsg)
	}


	getUser(email, password): Observable<number> {
		return this.http.post(CONFIG.apiUrl['DEV'] + "/api/sellers/login", 
  			JSON.stringify({ Email: email, Password: password  }))
                  .map(this.extractData)
                  .catch(this.handleError)
	}

}
