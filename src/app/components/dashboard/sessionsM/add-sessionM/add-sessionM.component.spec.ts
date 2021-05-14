import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSessionMComponent } from './add-sessionM.component';

describe('AddSessionComponent', () => {
  let component: AddSessionMComponent;
  let fixture: ComponentFixture<AddSessionMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSessionMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSessionMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
