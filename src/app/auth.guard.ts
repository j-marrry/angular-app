import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenStorageService);

  const currentUser = tokenService.getUser();

  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};