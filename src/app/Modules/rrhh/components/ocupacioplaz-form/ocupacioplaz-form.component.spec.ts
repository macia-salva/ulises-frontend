import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupacioplazFormComponent } from './ocupacioplaz-form.component';

describe('OcupacioplazFormComponent', () => {
  let component: OcupacioplazFormComponent;
  let fixture: ComponentFixture<OcupacioplazFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcupacioplazFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcupacioplazFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
