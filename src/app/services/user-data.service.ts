import { Injectable } from '@angular/core';
import { Observable,of,throwError } from 'rxjs';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {catchError,tap,map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};
const apiUrl = "https://reqres.in/api/users";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient) { }

  private handleError(error: HttpErrorResponse)
  {
    if(error.error instanceof ErrorEvent){
      console.error("error:", error.error.message );
    } else {
      console.error(
        'Arka plan ${error.status}, '+
        'gövde : ${error.error}');   
    }
    return throwError("birşeyler yanlış gitti tekrar dene ");
  }
  private extractData(res:Response){
    let body=res;
    return body || { };
  }
  getDataUser():Observable<any> {
    return this.http.get(apiUrl,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
