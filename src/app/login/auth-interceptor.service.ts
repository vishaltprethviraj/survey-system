import { Injectable } from '@angular/core';
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LoginService } from './login.service'; 
import { exhaustMap, take } from 'rxjs/operators';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    
    constructor(private loginService:LoginService){ }

    intercept(req:HttpRequest<any>,next:HttpHandler) {
        return this.loginService.user.pipe(
            take(1),
            exhaustMap(user =>{
                if(!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone(     { 
                    headers: new HttpHeaders(
                    {'Content-Type' : 'application/json',
                    'Authorization': user._token
                  })
            })
                return next.handle(modifiedReq);
            })
        );
        
    }

}