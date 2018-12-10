
import { IClaim } from 'src/app/Claims/claim';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClaimsService{
    private apiUrl = "https://localhost:5011/api/identity";

    constructor(private http: HttpClient, private oauthService: OAuthService){

    }

    getClaims(): Observable<IClaim[]> {
        // return [
        //     {
        //         type: "username",
        //         value: "test@gmail.com"
        //     },
        //     {
        //         type: "firstname",
        //         value: "Steven"
        //     },
        //     {
        //         type: "lastname",
        //         value: "Smith"
        //     }
        // ];
        var headers = new HttpHeaders({
            "Authorization": "Bearer " + this.oauthService.getAccessToken()
        });
        return this.http.get<IClaim[]>(this.apiUrl, {headers: headers} ).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data)))        );
    }
}