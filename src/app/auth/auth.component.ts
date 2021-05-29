import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error : string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  private closeSub : Subscription;


  constructor(
    private authService: AuthService,
    private router : Router,
    private cmpfactoryResolver : ComponentFactoryResolver  
  ){}

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
      this.router.navigate(['/recipes']);
    }, errMessage => {
      console.log(errMessage);
      this.isLoading = false;
      this.error = errMessage;
      this.handleError(errMessage);
    })
   
    form.reset();
  }

  onHandleError(){
    this.error = null;
  }

  private handleError(errMessage: string){
    const alert = this.cmpfactoryResolver.resolveComponentFactory(AlertComponent);
    const host = this.alertHost.viewContainerRef;
    host.clear();

    const hostRef = host.createComponent(alert);
    hostRef.instance.message = errMessage;

    this.closeSub = hostRef.instance.close.subscribe(() =>{
      this.closeSub.unsubscribe();
      host.clear();
    })

  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

}
