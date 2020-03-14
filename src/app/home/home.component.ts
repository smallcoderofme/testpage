import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  receive = [{ name: '卡布·加塔自然公园', post_id: '1234564564'},
  { name: '萨瑟兰瀑布和奎尔湖', post_id: '7987987444'}];
  constructor() { }

  ngOnInit(): void {

  }

}
