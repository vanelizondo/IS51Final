import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { Subject } from 'rxjs';

export interface IUser {
  id?: number;
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: IUser = { username: null, password: null };
  constructor(private router: Router, private toastService: ToastService) {
  }

  ngOnInit() {

  }

  login(user: IUser) {
    console.log('user', user);
    if (user.username !== 'phanlucas' || user.password !== 'lucas123') {
      this.toastService.showToast('danger', 7000, 'Invalid credentials!');
    } else {
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['cart']);
    }
  }

}
