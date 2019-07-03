import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CommanService} from '../services/comman/comman.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private Active: CommanService,
    private route: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.Active.loggedIn()) {
      return true;
    } else {
      this.route.navigate(['']);
      return false;
    }
  }
}
