import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrighsComponent } from './myrighs.component';

describe('MyrighsComponent', () => {
  let component: MyrighsComponent;
  let fixture: ComponentFixture<MyrighsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyrighsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyrighsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
