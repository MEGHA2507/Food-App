import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error : string = null;

  constructor(private authService: AuthService){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    // console.log(form);
    if(!form.valid){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    let authObj : Observable<AuthResponseData>;
    this.isLoading = true;

    if(this.isLoginMode){
      // sign in or login in
      authObj = this.authService.login(email, password);
    }else{
      authObj = this.authService.signUp(email, password);
    }

    authObj.subscribe((res) => {
      console.log(res);
      this.isLoading = false;
    }, errMessage => {
      console.log(errMessage);
      this.isLoading = false;
      this.error = errMessage;
    })
   
    form.reset();
  }

  ngOnInit(): void {
  }

}
