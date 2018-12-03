import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(public oidcSecurityService: OidcSecurityService) {
    this.oidcSecurityService.getIsModuleSetup().pipe(
      filter((isModuleSetup: boolean) => isModuleSetup),
      take(1)
    ).subscribe((isModuleSetup: boolean) => {
      this.doCallbackLogicIfRequired();
    });
  }

  ngOnInit() { }

  ngOnDestroy(): void { }

  login() {

    // if you need to add extra parameters to the login
    // let culture = 'de-CH';
    // this.oidcSecurityService.setCustomRequestParameters({ 'ui_locales': culture });

    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  private doCallbackLogicIfRequired() {
    if (window.location.hash) {
      this.oidcSecurityService.authorizedCallback();
    }
  }
}
