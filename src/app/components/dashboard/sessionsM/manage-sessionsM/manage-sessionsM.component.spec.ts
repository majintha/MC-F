import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSessionsMComponent } from './manage-sessionsM.component';

describe('ManageSessionsMComponent', () => {
  let component: ManageSessionsMComponent;
  let fixture: ComponentFixture<ManageSessionsMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSessionsMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSessionsMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
