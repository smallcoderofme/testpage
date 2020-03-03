import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  status = { logined: false };
  tags = [
    { name: 'art', id: 'djs3b423brwe' },
    { name: 'life', id: 'djs3as423brwe' },
    { name: 'view', id: 'djs3b42sad3brwe' } ];
  tempTag = {name: ''};
  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
    const user = this.authService.getCookie('ironseal_token');
    if (user && user.length) {
      this.status.logined = true;
    } else {
      this.status.logined = false;
    }
  }

  newTag() {
    const tag = { name: this.tempTag.name, id: (Math.random() * 99999999).toString() };
    this.tags.push( tag );
    this.tempTag.name = '';
  }

  delTag(tagId: string) {
    for (let index = 0; index < this.tags.length; index++) {
      const element = this.tags[index];
      if ( element.id === tagId ) {
        this.tags.splice(index, 1);
        return;
      }
    }
  }
}
