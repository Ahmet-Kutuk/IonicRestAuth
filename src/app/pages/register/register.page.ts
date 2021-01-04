import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';


const { Storage } = Plugins;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  uyelikBilgisi: FormGroup;

  userValues: any;

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router, private alertController:AlertController) { }

  ngOnInit() {
    this.uyelikBilgisi = this.fb.group({
      ad:['Charles Morris', [Validators.required, Validators.minLength(3)]],
      email:['charles.morris@reqres.in', [Validators.required, Validators.email]],
      password:['123456', [Validators.required, Validators.minLength(6)]],
    });
  }

  async presentAlert(mesaj) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Hata !',
      message: mesaj,
      buttons: ['Tamam']
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

signup()
{
  //console.log(this.uyelikBilgisi.value);
  this.authService.signup(this.uyelikBilgisi.value).subscribe(sonuc => {
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

get ad()
{
  return this.uyelikBilgisi.get('ad');
}

}
