import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipacioListComponent } from './participacio-list.component';

describe('ParticipacioListComponent', () => {
  let component: ParticipacioListComponent;
  let fixture: ComponentFixture<ParticipacioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipacioListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipacioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
