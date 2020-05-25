import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor() { }

  get_series() {}

  get_admin_series() {} // content artile title, public (true, false)

  get_article() {}

  get_admin_article() {}

  update_series_name() {}

  delete_series() {}

  set_series_publish() {}

  set_artile_publish(){}

  update_article() {}

  delete_article() {}
}
