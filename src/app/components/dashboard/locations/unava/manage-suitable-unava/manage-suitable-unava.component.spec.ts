import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSuitableUnavaComponent } from './manage-suitable-unava.component';

describe('ManageSuitableUnavaComponent', () => {
  let component: ManageSuitableUnavaComponent;
  let fixture: ComponentFixture<ManageSuitableUnavaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSuitableUnavaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSuitableUnavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
