import {CanActivateFn, Router} from '@angular/router';
import { AuthenticationService } from './shared/authentication.service';
import {inject} from "@angular/core";

export const canNavigateToAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if(authService.isLoggedIn()){
    return true;
  } else {
    window.alert("sie müssen eingeloggt sein");
    router.navigateByUrl("/");
    return false;
  }
};
