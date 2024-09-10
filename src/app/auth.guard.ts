import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state):any => {
  let jwtToken = localStorage.getItem('jwt-token')
  let router = inject(Router)
  if(jwtToken)
  {
    return true
  }
  else{
    router.navigate(['/login'])
    return false
  }
};
