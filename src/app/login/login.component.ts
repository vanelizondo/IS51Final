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

  user: IUser = { username: '', password: '' };

  constructor(private router: Router, private toastService: ToastService) {
  }

  ngOnInit() {

  }

  login(user: IUser) {
    console.log('from login user: ', user);
    const defaultUser: IUser = { username: 'vanessa', password: 'vanessa123' }
    if (user.username !== '' && user.password !== '') {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
        //  log the user in 
        // store user in localStorage
        // navigate to contacts page
        this.router.navigate(['cart', user]);

      } else {
        // show error toast user
        this.toastService.showToast('danger', 15000, 'username and/or password not matching default user credentials');

      }
     
    } else {
      //  show error toast user
      this.toastService.showToast('danger', 15000, 'username and/or password not specified');
    }
  }
}



