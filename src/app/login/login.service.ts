import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject } from 'rxjs';
import  { catchError,tap } from 'rxjs/operators';

import { User } from './user.model';

interface LoginResponseData {    
    // kind:string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;    
    registered: boolean;
}

@Injectable( { providedIn:'root' })

export class LoginService {

    user = new Subject<User>();

    error:string = null;
    constructor(private http:HttpClient){ }

    login(username:string,password:string) {                
        return this.http.post<LoginResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCnW71LtmYCe-fFOiO1F-4j-7qCzl354c8',
        {
            email: username,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {            
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        }));
        
    }

    private handleAuthentication(email:string,userId:string,token:string,expiresIn:number) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
           
        const user = new User(email,userId,token,expirationDate);        
        // this.user.next(user);        
        //storing in local storage and retreiving it 
        localStorage.setItem('user',JSON.stringify(user));
        var retrievedItem = localStorage.getItem('user');
        console.log('Retrieved Item: ',JSON.parse(retrievedItem));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!';
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
        }
        return throwError(errorMessage);
    }
}