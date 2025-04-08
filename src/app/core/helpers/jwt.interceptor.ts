import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../feature/services/auth/auth.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth: AuthService = inject(AuthService);

  let currentUser = auth.currentToken;

  if (currentUser) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser}`,
      },
    });
  }
  return next(req);
};
