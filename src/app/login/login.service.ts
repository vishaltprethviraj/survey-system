import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject } from 'rxjs';
import  { catchError,tap } from 'rxjs/operators';

import { User } from './user.model';
import { Router } from '@angular/router';

interface LoginResponseData {    
    // kind:string;
    role: string;
    accesstoken: string;
    refreshtoken: string;
    roleid: string;
    username: string;    
    email: string;
    expire:{ 
        expiresIn:string
    }
    _id:string;
    message:string;
    messgae:string;
}

@Injectable( { providedIn:'root' })

export class LoginService {

    user = new BehaviorSubject<User>(null);

    error:string = null;
    constructor(private http:HttpClient,private router:Router){ }

    login(username:string,password:string) {                
        return this.http.post<LoginResponseData>('http://74.208.150.171:3501/api/v1/login',
        {
            username: username,
            password: password,            
        }).pipe(tap(resData => {            
            this.handleAuthentication(resData.role,resData.accesstoken,resData.refreshtoken,resData.roleid,resData.username,resData.email,resData._id);
        }));
        
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/login']); 
        localStorage.removeItem('userData');
        localStorage.removeItem('departmentData');
        localStorage.removeItem('designationData');       
    }

    private handleAuthentication(message:string,accesstoken:string,refreshtoken:string,roleid:string,username:string,email:string,_id:string) {
        // const expirationDate = new Date(
        //     new Date().getTime() + expiresIn * 1000
        // );
           
        const user = new User(message,accesstoken,refreshtoken,roleid,username,email,_id);        
        this.user.next(user);         
        if(localStorage.getItem("username") === null) {
            localStorage.setItem('userData',JSON.stringify(user));        
        }                       
        // var retrievedItem = localStorage.getItem('user');
        // console.log('Retrieved Item: ',JSON.parse(retrievedItem));
    }

    // private handleError(errorRes: HttpErrorResponse) {
    //     let errorMessage = 'An unknown error occured!';
    //     if(!errorRes.message) {
    //         return throwError(errorMessage);
    //     }
    //     switch(errorRes.message.toString()) {
    //         case 'WRONG PASSWORD':
    //             errorMessage = 'Invalid Password';
    //         case 'USER NOT FOUND':
    //             errorMessage = 'This user does not exist'
    //     }        
    //     return throwError(errorMessage);
    // }
}