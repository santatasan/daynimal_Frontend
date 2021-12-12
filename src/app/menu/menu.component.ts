import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged: boolean;
  username: string;

  constructor(private usersService: UsersService, private router: Router) {

    this.isLogged = false;
    this.username = '';
  }

  async ngOnInit() {
    try {
      this.username = (await this.usersService.getProfile()).username;
      this.isLogged = true;
    } catch (err: any) {
      this.isLogged = false;
    };
    this.usersService.loginObs().subscribe(res => this.isLogged = res);
    this.usersService.usernameObs().subscribe(res => this.username = res);
  }

  onClick() {
    const sure = confirm('¿Seguro que quieres cerrar la sesión?');
    if (sure) {
      localStorage.removeItem('token');
      this.usersService.logged(false);
      this.router.navigate(['/login']);
    };
  };

}
