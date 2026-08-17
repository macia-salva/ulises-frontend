import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaParticipacioComponent } from './nova-participacio.component';

describe('NovaParticipacioComponent', () => {
  let component: NovaParticipacioComponent;
  let fixture: ComponentFixture<NovaParticipacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaParticipacioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaParticipacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
