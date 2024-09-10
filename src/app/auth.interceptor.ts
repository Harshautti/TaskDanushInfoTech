import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("interceptor working ",req.url)
  var jwtToken = localStorage.getItem('jwt-token')
  if(jwtToken){
   var cloned = req.clone({
      setHeaders : {
        Authorization : `Bearer ${jwtToken}`
      }
    })
    return next(cloned)
  }
  return next(req);
};
