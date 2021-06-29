import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerScoreComponent } from './volunteer-score.component';

describe('VolunteerScoreComponent', () => {
  let component: VolunteerScoreComponent;
  let fixture: ComponentFixture<VolunteerScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
