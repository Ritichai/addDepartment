import { UserAuthorizationService } from '../services/user-authorization.service';
import { HttpClient } from '@angular/common/http';

export const memberGuard = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const http = args[0] as HttpClient;
      const userAuthorizationService = args[1] as UserAuthorizationService;
      userAuthorizationService.checkLoggedIn().subscribe((response: any) => {
        if (response['status'] == 200) {
          if (response['body']['isMember'] == true) {
            originalMethod.apply(this, args);
          } else {
            // redirect to guest dashboard
            console.log("guest");
            localStorage.clear();
          }
        } else {
          // login failed
          localStorage.clear();
        }
      });
    };
    return descriptor;
  };
}
