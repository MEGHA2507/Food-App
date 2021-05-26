import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

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

    constructor(
        private http: HttpClient
    ){}

    signUp(email: string, password: string){
        console.log('sign up');
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpargSkz5XN62-GFdTbQN2Wv3mWVKdExA',
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
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpargSkz5XN62-GFdTbQN2Wv3mWVKdExA',
        {
            email: email,
            password: password,
            returnSecureToken : true
        }).pipe(catchError(this.handleError) ,tap(res => {
            this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
        }));
    }

    private handleAuthentication(email:string, id:string, token:string, expiresIn:number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const newUser = new User(email, id, token, expirationDate);
        this.user.next(newUser);
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

