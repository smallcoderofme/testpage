import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const strogeUser = 'S6I';

export class UserServiceConfig {
  userName = 'Philip Marlowe';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // tslint:disable-next-line: variable-name
  private m_UserName = 'Abadon';
  public loginUser: BehaviorSubject<UserServiceConfig> = new BehaviorSubject<UserServiceConfig>({userName: this.m_UserName});
  constructor(@Optional() config?: UserServiceConfig) {
    if (config) { this.m_UserName = config.userName; }
    this.loginUser.subscribe(value => {
      this.userName = value.userName;
    });
  }

  get userName() {
    this.m_UserName = localStorage.getItem(strogeUser);
    return this.m_UserName;
  }

  set userName(username: string) {
    this.m_UserName = username;
    localStorage.setItem(strogeUser, username);
  }
}
