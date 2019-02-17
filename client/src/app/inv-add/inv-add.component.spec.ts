import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvAddComponent } from './inv-add.component';

describe('InvAddComponent', () => {
  let component: InvAddComponent;
  let fixture: ComponentFixture<InvAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
