import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTagComponent } from './auth.tag.component';

describe('AuthTagComponent', () => {
  let component: AuthTagComponent;
  let fixture: ComponentFixture<AuthTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
