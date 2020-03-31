import { Component, OnInit } from "@angular/core";

@Component({
    template: `
    <div class="content-top">Home</div>
    <form class="form-group">
        <label>username</label>
        <input type="text" [(ngModel)]="pageName" [ngModelOptions]="{standalone: true}" required>
    </form>
    <p>{{ pageName }}</p>`
})
export class HomeComponent implements OnInit {
    pageName = 'home page';
    constructor() {}

    ngOnInit(){}
}