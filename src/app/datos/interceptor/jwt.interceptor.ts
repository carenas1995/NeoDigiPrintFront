import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const cookieService = inject(CookieService);
    const token = cookieService.get('authToken');

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(req);
};