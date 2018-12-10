import { Component } from '@angular/core';
import { ClaimsService } from 'src/app/Claims/claims.service';

@Component({
    selector: "ps-claims",
    templateUrl: './claims-list.component.html'
})

export class ClaimsListComponent {
    errorMessage: any;
    title: string = 'User Claims';
    claims = null;

    constructor(private claimsService: ClaimsService){
    }

    ngOnInit(): void{
        this.claimsService.getClaims().subscribe(
            claims => this.claims = claims,
            error => this.errorMessage = <any>error
        );
    }
}