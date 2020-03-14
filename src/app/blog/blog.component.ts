import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts = [
    {
      title: '卡布·加塔自然公园',
      cover: '',
      preview: '位于西班牙南部的卡布·加塔自然公园拥有神秘的湿地、浪漫的海滩、壮观的火山和令人赞叹的高山悬崖。走过柔软沙滩，在湛蓝的大海中尽情游泳，人生最大的享受莫过于此。',
      created_at: '2019-03-02',
      author: 'Jugg',
      post_id: '1234564564'
    },
    {
      title: '萨瑟兰瀑布和奎尔湖',
      cover: '',
      preview: '新西兰的萨瑟兰瀑布和奎尔湖 (© Michael Rathmayr/plainpicture)',
      created_at: '2019-03-03',
      author: 'Troll',
      post_id: '7987987444'
    }
  ];
  status = { loading: true };
  tags = [
    { name: 'art', id: 'djs3b423brwe' },
    { name: 'life', id: 'djs3as423brwe' },
    { name: 'view', id: 'djs3b42sad3brwe' } ];
  hots = [{ name: '卡布·加塔自然公园', post_id: '1234564564'},
    { name: '萨瑟兰瀑布和奎尔湖', post_id: '7987987444'}];
  constructor() { }

  ngOnInit(): void {
    this.status.loading = false;
  }

}
