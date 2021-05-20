import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavaComponent } from './unava.component';

describe('RoomsComponent', () => {
  let component: UnavaComponent;
  let fixture: ComponentFixture<UnavaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnavaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
