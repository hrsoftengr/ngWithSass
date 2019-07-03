import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CommanService} from '../services/comman/comman.service';
import { CustomValidators } from 'ng2-validation';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {first} from 'rxjs/operators';
const password = new FormControl('', Validators.required);


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  errorMessage: string ;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _httpCall: CommanService,
    private _http: HttpClient
  ) {}

  /*Get data function*/
  get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this._fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
      ]],
    });
  }
  onSubmit() {
    console.log('data', this.f.email.value , this.f.password.value);
    this._httpCall.UserLogin(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {
          if (data.HttpCode === 200 && data.status === 'success') {
/*            this.localstorageService.set('_auth', data.authToken);
            this.localstorageService.set('_user', data.result);
            this.loginService.IsUserLoggedIn.next(true);
            if (history.length > 2) {
              this.location.back();
            } else {
              this.router.navigate(['/dashboard']);
            }*/
            localStorage.setItem('Bearer', data.authToken);
            this._router.navigate(['/home']);
          }
        },
        error => {
          this.errorMessage = error.error.message;
        });
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['']);

  }

}
