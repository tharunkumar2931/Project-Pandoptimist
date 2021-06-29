import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentRequestComponent } from './equipment-request.component';

describe('EquipmentRequestComponent', () => {
  let component: EquipmentRequestComponent;
  let fixture: ComponentFixture<EquipmentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
