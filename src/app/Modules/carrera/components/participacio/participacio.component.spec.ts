import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipacioComponent } from './participacio.component';

describe('ParticipacioComponent', () => {
  let component: ParticipacioComponent;
  let fixture: ComponentFixture<ParticipacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipacioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
