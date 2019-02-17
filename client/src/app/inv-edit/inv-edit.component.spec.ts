import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvEditComponent } from './inv-edit.component';

describe('InvEditComponent', () => {
  let component: InvEditComponent;
  let fixture: ComponentFixture<InvEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
