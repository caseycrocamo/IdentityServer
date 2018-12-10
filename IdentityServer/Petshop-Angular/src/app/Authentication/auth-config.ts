import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: 'https://localhost:5001',

  // URL of the SPA to redirect the user to after login
  redirectUri: "http://localhost:4200",

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'js.client',

  //url of the SPA to redirect the user to after logout
  postLogoutRedirectUri: "http://localhost:4200",

  // set the scope for the permissions the client should request
  // The first 2 are defined by OIDC. The 3rd is a usecase-specific one
  scope: 'openid profile petstore',
}