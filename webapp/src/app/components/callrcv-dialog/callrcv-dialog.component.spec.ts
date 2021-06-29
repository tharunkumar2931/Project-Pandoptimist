import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallrcvDialogComponent } from './callrcv-dialog.component';

describe('CallrcvDialogComponent', () => {
  let component: CallrcvDialogComponent;
  let fixture: ComponentFixture<CallrcvDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallrcvDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallrcvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
