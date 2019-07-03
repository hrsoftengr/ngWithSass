import { Injectable } from '@angular/core';
import {Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Global} from '../global';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommanService {
  private API = `${Global.API_Call}/api/user/UserLogin`;

  constructor( private router: Router, private _http: HttpClient) { }

  /* This function checked is login or not login*/
  loggedIn() {
    if (localStorage.length > 1) {
      this.router.navigate(['/home']);
    } else {
      return !!localStorage.getItem( 'Bearer');
    }
  } // End Function

  UserLogin(email: string, password: string) {
    return this._http.post<any>(this.API , {email, password}).pipe(map(data => {
      return data ;
    }));
  } // END  USER LOGIN

  /* Service calling with API */

  GetUserData() {
   return this._http.get<any>(' https://jsonplaceholder.typicode.com/todos/', {
     observe : 'response'
   });
  }

}
