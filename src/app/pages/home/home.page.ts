import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



const { Storage } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    
  constructor(private router:Router,private http:HttpClient) {}
  users: any=[];



runHttp(){
   this.http.get('https://reqres.in/api/users?page=2',{}).subscribe(data => {
      console.log(data);
    this.users = data.data
    console.log(this.users);
     })
   }


  async removeItem(item) {
    await Storage.remove({ key: item });
  }

  logout()
  {

    this.removeItem('user_ionichttpAuth');
    this.router.navigateByUrl('/login');

  }

}
