import { Component } from '@angular/core';

@Component({
    selector: "ps-claims",
    templateUrl: './claims-list.component.html'
})

export class ClaimsListComponent {
    title: string = 'User Claims';
    claims = null;
}