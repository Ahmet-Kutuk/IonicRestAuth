import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = "https://reqres.in/api/";

  constructor(private httpClient:HttpClient) { }


login(data)
  {
    return this.httpClient.post(this.URL + 'login', data);
  }

  signup(data)
  {
    return this.httpClient.post(this.URL + 'register', data);
  }
}
