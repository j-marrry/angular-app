/*import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const isAdmin = currentUser?.roles?.includes('admin');
  
    if (!isAdmin) {
      router.navigate(['/']);
      return false;
    }
  
    return true;
};
*/