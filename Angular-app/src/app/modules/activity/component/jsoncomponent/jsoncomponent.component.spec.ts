import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsoncomponentComponent } from './jsoncomponent.component';

describe('JsoncomponentComponent', () => {
  let component: JsoncomponentComponent;
  let fixture: ComponentFixture<JsoncomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsoncomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsoncomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
