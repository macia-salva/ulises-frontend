import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupaciollocFormComponent } from './ocupaciolloc-form.component';

describe('OcupaciollocFormComponent', () => {
  let component: OcupaciollocFormComponent;
  let fixture: ComponentFixture<OcupaciollocFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcupaciollocFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcupaciollocFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
