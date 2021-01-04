import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { AuthService } from 'src/app/services/auth.service';

const { Storage } = Plugins;



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  uyelikBilgisi: FormGroup;

  userValues: any;

  constructor(private form: FormBuilder, private authService:AuthService, private router:Router, private alertController:AlertController) { }

  ngOnInit() {
    this.uyelikBilgisi = this.form.group({
      email:['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password:['cityslicka', [Validators.required, Validators.minLength(6)]],
    });
  }

  async presentAlert(mesaj) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: mesaj,
      buttons: ['Close']
    });

    await alert.present();
  }

  async setObject(token) {
    await Storage.set({
      key: 'user_ionichttpAuth',
      value: JSON.stringify({
        token: token
      })
    });
  }

login()
{
  this.authService.login(this.uyelikBilgisi.value).subscribe(sonuc => { 
    this.userValues = sonuc;
    console.log(sonuc);
    this.setObject(this.userValues.token);
    this.router.navigateByUrl('/home');
  
  }, err=> {console.log(err); this.presentAlert(err.error.error)});
}

  get email()
{
  return this.uyelikBilgisi.get('email');
}

get password()
{
  return this.uyelikBilgisi.get('password');
}

}
