import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_services/alertify.service';
import { Router, ActivatedRoute, Resolve } from '@angular/router';
import { UserService } from './../_services/user.service';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { catchError } from 'rxjs/operators';
import { error } from 'protractor';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRoute): Observable<User> {
    return this.userService.getUser(route.params['id']).pipe(
      catchError((error) => {
        this.alertify.error('Problem retriving data');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
