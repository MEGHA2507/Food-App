import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { environment } from '../../environments/environment';

export interface AuthResponseData{
    kind: string,
    idToken: string,
    email : string, 
    refreshToken : string,
    expiresIn:	string,
    localId: string,
    registered ?: boolean
}

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    // user = new Subject();
    user = new BehaviorSubject<User>(null);
    private tokenTimer : any;

    constructor(
        private http: HttpClient,
        private router : Router
    ){}

    signUp(email: string, password: string){
        console.log('sign up');
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.ApiKey,
            {
                email: email,
                password: password,
                returnSecureToken : true
            }
        ).pipe(catchError(this.handleError), tap(res => {
            this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
        }));
    }

    login(email:string, password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.ApiKey,
        {
            email: email,
            password: password,
            returnSecureToken : true
        }).pipe(catchError(this.handleError) ,tap(res => {
            this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
        }));
    }

    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenTimer){
            clearTimeout(this.tokenTimer); 
        }
        this.tokenTimer = null;
    }

    autoLogin(){
        const userData : {
            email: string, id: string,  _token: string, tokenexpireDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData){
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData.tokenexpireDate));
        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationtimer = new Date(userData.tokenexpireDate).getTime() - new Date().getTime();
            this.autoLogOut(expirationtimer);
        }
    }

    autoLogOut(expirationTime: number){
        this.tokenTimer = setTimeout(()=>{
            this.logOut();
        }, expirationTime);
    }

    private handleAuthentication(email:string, id:string, token:string, expiresIn:number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const newUser = new User(email, id, token, expirationDate);
        this.user.next(newUser);
        this.autoLogOut(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(newUser));
    }

    private handleError(errResponse : HttpErrorResponse){
        let errMessage = 'An unknown error occured';

        if(!errResponse.error || !errResponse.error.error){
            return throwError(errMessage)
        }
 
        switch(errResponse.error.error.message){
            case 'EMAIL_EXISTS':
                errMessage = 'This email already exits';
                break;
            case 'EMAIL_NOT_FOUND':
                errMessage = 'This email doesnot exits';
                break;
            case 'INVALID_PASSWORD':
                errMessage = 'The passowrd is invalid';
                break;
            case 'USER_DISABLED':
                errMessage = 'the user is disabled';
        }

        return throwError(errMessage);
    }
}

