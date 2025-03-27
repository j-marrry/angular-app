import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenStorageService);

  const currentUser = tokenService.getUser();
  const isAdmin = currentUser?.roles?.some((role: any) => role.authority === 'ROLE_ADMIN');

  if (!isAdmin) {
    router.navigate(['/']);
    return false;
  }

  return true;
};