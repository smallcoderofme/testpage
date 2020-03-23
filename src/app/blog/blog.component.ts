import { Component, OnInit } from '@angular/core';
import { MemaryHttpSupport } from '../memary-http-support';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  status = { loading: true };
  posts;
  tags;
  hots;
  constructor(private httpServer: MemaryHttpSupport) { }

  ngOnInit(): void {
    this.status.loading = false;
    this.httpServer.getPosts().subscribe(next => {
      this.posts = next;
    });
    this.httpServer.getTags().subscribe(next => {
      this.tags = next;
    });
    this.httpServer.getHots().subscribe(next => {
      this.hots = next;
    });
  }
}
