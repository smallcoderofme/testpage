
import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

let nextId = 1;

export class UserServiceConfig {
  userName = 'Philip Marlowe';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  id = nextId++;
  // tslint:disable-next-line: variable-name
  private m_UserName = 'Shuai';
  public loginUser: BehaviorSubject<UserServiceConfig> = new BehaviorSubject<UserServiceConfig>({userName: this.m_UserName});
  constructor(@Optional() config?: UserServiceConfig) {
    if (config) { this.m_UserName = config.userName; }
  }

  get userName() {
    // Demo: add a suffix if this service has been created more than once
    const suffix = this.id > 1 ? ` times ${this.id}` : '';
    return this.m_UserName + suffix;
  }

  set userName(username: string) {
    this.m_UserName = username;
  }
}
