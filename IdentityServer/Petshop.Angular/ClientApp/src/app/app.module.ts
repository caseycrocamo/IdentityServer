import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import {
  AuthModule,
  OidcSecurityService,
  OpenIDImplicitFlowConfiguration,
  OidcConfigService,
  AuthWellKnownEndpoints
} from 'angular-auth-oidc-client';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    AuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public oidcSecurityService: OidcSecurityService) {
    const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();

    openIDImplicitFlowConfiguration.stsServer = 'https://localhost:44363';
    openIDImplicitFlowConfiguration.redirect_url = 'https://localhost:44363';
    // The Client MUST validate that the aud (audience) Claim contains its client_id value registered at the Issuer identified by the iss (issuer) Claim as an audience.
    // The ID Token MUST be rejected if the ID Token does not list the Client as a valid audience, or if it contains additional audiences not trusted by the Client.
    openIDImplicitFlowConfiguration.client_id = 'singleapp';
    openIDImplicitFlowConfiguration.response_type = 'id_token token';
    openIDImplicitFlowConfiguration.scope = 'dataEventRecords openid';
    openIDImplicitFlowConfiguration.post_logout_redirect_uri =
      'https://localhost:44363/Unauthorized';
    openIDImplicitFlowConfiguration.start_checksession = false;
    openIDImplicitFlowConfiguration.silent_renew = true;
    openIDImplicitFlowConfiguration.silent_renew_url =
      'https://localhost:44363/silent-renew.html';
    openIDImplicitFlowConfiguration.post_login_route = '/dataeventrecords';
    // HTTP 403
    openIDImplicitFlowConfiguration.forbidden_route = '/Forbidden';
    // HTTP 401
    openIDImplicitFlowConfiguration.unauthorized_route = '/Unauthorized';
    openIDImplicitFlowConfiguration.log_console_warning_active = true;
    openIDImplicitFlowConfiguration.log_console_debug_active = true;
    // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
    // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
    openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 10;

    const authWellKnownEndpoints = new AuthWellKnownEndpoints();
    authWellKnownEndpoints.issuer = 'https://localhost:44363';

    authWellKnownEndpoints.jwks_uri =
      'https://localhost:44363/.well-known/openid-configuration/jwks';
    authWellKnownEndpoints.authorization_endpoint = 'https://localhost:44363/connect/authorize';
    authWellKnownEndpoints.token_endpoint = 'https://localhost:44363/connect/token';
    authWellKnownEndpoints.userinfo_endpoint = 'https://localhost:44363/connect/userinfo';
    authWellKnownEndpoints.end_session_endpoint = 'https://localhost:44363/connect/endsession';
    authWellKnownEndpoints.check_session_iframe =
      'https://localhost:44363/connect/checksession';
    authWellKnownEndpoints.revocation_endpoint = 'https://localhost:44363/connect/revocation';
    authWellKnownEndpoints.introspection_endpoint =
      'https://localhost:44363/connect/introspect';

    this.oidcSecurityService.setupModule(
      openIDImplicitFlowConfiguration,
      authWellKnownEndpoints
    );
  }
}
