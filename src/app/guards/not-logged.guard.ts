import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {

  constructor(private router: Router, private usersService: UsersService) { };

  async canActivate() {
    if (localStorage.getItem('token')) {
      try {
        await this.usersService.getProfile();
      } catch (err: any) {
        return true;
      }
      this.router.navigate(['/animals']);
      return false;
    } else {
      return true;
    }
  };

}
