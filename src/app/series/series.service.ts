import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor() { }

  get_series() {}

  get_admin_series() {} // content artile title, public (true, false)

  get_article(artileId: string) {}

  update_series_name(seriesId: string, name: string) {}

  delete_series(seriesId: string) {}

  set_series_publish(seriesId: string, publish: boolean) {}

  update_article(articleId: string, article: any) {}

  delete_article(artileId: string) {}

  set_artile_publish(articleId: string, publish: boolean){}
}
