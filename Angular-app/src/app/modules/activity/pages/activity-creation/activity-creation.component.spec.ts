import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCreationComponent } from './activity-creation.component';

describe('ActivityCreationComponent', () => {
  let component: ActivityCreationComponent;
  let fixture: ComponentFixture<ActivityCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
