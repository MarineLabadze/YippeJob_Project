import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingRequestComponent } from './receiving-request.component';

describe('ReceivingRequestComponent', () => {
  let component: ReceivingRequestComponent;
  let fixture: ComponentFixture<ReceivingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivingRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
