import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(private router: Router, private usersService: UsersService) { };

  async canActivate() {
    if (localStorage.getItem('token')) {
      try {
        await this.usersService.getProfile();
      } catch (err: any) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  };

}
