import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  post = {
    title: '幽灵眼镜猴',
    // tslint:disable-next-line: max-line-length
    content: '幽灵眼镜猴 榕树上的幽灵眼镜猴© Ondrej Prosicky/Shutterstock 我们不需要借口来强调和庆祝野生动物，但事实证明，今天是联合国的世界野生动物日。今年的主题是“维持地球上所有的生命”，重点是生物多样性。联合国及其合作伙伴正在制作一系列节目和社会媒体活动，包括在纽约联合国总部举行的活动、电影节和国际青年艺术比赛。 印度尼西亚的Tangkoko Batuangus自然保护区是生物多样性的重要象征，保护着数百种植物、哺乳动物、鸟类、爬行动物和两栖动物。在受威胁的哺乳动物中有这些光谱眼镜猴。这些夜间活动的小型灵长类动物的眼睛比它们的大脑还大，这使它们看起来像外星人。它们没有濒临灭绝的危险，但被归为脆弱物种，由于人类活动和栖息地的丧失，它们的数量已经减少。',
    created_at: '2020-03-03',
    author: 'Shutterstock'
  };
  constructor( private activeRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    const pid: string = this.activeRoute.snapshot.paramMap.get('postId');
    console.log(pid);
  }

}
