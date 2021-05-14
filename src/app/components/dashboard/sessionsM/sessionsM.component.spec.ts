import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsMComponent } from './sessionsM.component';

describe('SessionsComponent', () => {
  let component: SessionsMComponent;
  let fixture: ComponentFixture<SessionsMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionsMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionsMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
