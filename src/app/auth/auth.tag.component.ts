import { Component, OnInit } from '@angular/core';
import { MemaryHttpSupport } from '../memary-http-support';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.tag.component.html',
  styleUrls: ['./auth.tag.component.css']
})
export class AuthTagComponent implements OnInit {
  /**
   * selected param: 1 tags, 2 post
   */
  status = { logined: false, selected: 1 };
  tags;
  tempTag = {name: ''};
  posts;
  constructor( private httpServer: MemaryHttpSupport, public global: Globals, private router: Router) { }

  ngOnInit(): void {
    if (!this.global.userInfo) {
      this.router.navigateByUrl('auth/manage');
    }
    this.httpServer.getTags().subscribe(next => {
      this.tags = next;
    });
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
