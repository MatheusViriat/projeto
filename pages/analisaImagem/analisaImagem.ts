import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  templateUrl: 'analisaImagem.html'
})
export class AnalisaImagem {

	items: FirebaseListObservable<any[]>;
	constructor(public navCtrl: NavController,
		private camera: Camera,
  		private vision: GoogleCloudVisionServiceProvider,
  		private db: AngularFireDatabase,
  		private alert: AlertController,
  		private _loadCrl: LoadingController) {

		let loader = this._loadCrl.create({
			content: "Carregando, aguarde..."
		});

    	loader.present();

    	this.items = db.list('items2');

		loader.dismiss();

	}

	saveResults(imageData, results) {
  		this.items.push({ imageData: imageData, results: results})
    	.then(_ => { })
    	.catch(err => { this.showAlert(err) });
	}

	showAlert(message) {
		let alert = this.alert.create({
			title: 'Error',
			subTitle: message,
			buttons: ['OK']
		});
		alert.present();
		console.log(this.items[0]);
	}

	takePhoto() {
  		const options: CameraOptions = {
		    quality: 100,
		    targetHeight: 500,
		    targetWidth: 500,
		    destinationType: this.camera.DestinationType.DATA_URL,
		    encodingType: this.camera.EncodingType.PNG,
		    mediaType: this.camera.MediaType.PICTURE
  		}
  		this.camera.getPicture(options).then((imageData) => {
    		this.vision.getLabels(imageData).subscribe((result) => {
    			this.saveResults(imageData, result.json().responses);
    		}, err => {
      			this.showAlert(err);
    		});
  		}, err => {
    		this.showAlert(err);
  		});
	}
}
