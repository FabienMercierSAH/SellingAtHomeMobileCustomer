import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular'

import { LoginProvider } from '../../providers/login/login'
import { HomePage } from '../home/home'

@IonicPage()
@Component({
  	selector: 'page-login',
  	templateUrl: 'login.html'
})

export class LoginPage {

	countries: string[] = []
	errorMessage: string
	userId: number
	user = {
		id: 0,
		login: "",
		password: ""
	}

	constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public _login: LoginProvider) {	
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage')
	}

	presentAlert(title: string, msg: string) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: "<BR />" + msg,
			buttons: ['OK']
		})

		alert.present()
	}

	login() {
		if(this.user.login === "" || this.user.password === "" ){
			this.presentAlert("Attention","Vous devez remplir tous les champs.")
		}
		else{
		    this._login.getUser(this.user.login, this.user.password)
		       .subscribe(
		         user_id => this.user.id = user_id,
		         error =>  {
		         	this.errorMessage = <any>error
		         	this.presentAlert("Attention","Utilisateur inconnu.<BR /><BR />Veuillez vérifier les informations saisies.")
		         },
		       	 () => { 
		       	 	console.log(this.user) 

		       	 	this.navCtrl.push(HomePage)

		       	 })    
		}
	}

}
