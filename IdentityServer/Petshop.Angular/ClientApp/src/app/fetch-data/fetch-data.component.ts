import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public claims: IdentityClaims[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<IdentityClaims[]>(baseUrl + '/api/identity').subscribe(result => {
      this.claims = result;
    }, error => console.error(error));
  }
}

interface IdentityClaims {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
