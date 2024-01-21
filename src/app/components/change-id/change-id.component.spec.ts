import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeIdComponent } from './change-id.component';

describe('ChangeIdComponent', () => {
  let component: ChangeIdComponent;
  let fixture: ComponentFixture<ChangeIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
