import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptViewerComponent } from './receipt-viewer.component';

describe('ReceiptViewerComponent', () => {
  let component: ReceiptViewerComponent;
  let fixture: ComponentFixture<ReceiptViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
