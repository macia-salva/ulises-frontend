import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriaListComponent } from './convocatoria-list.component';

describe('ConvocatoriaListComponent', () => {
  let component: ConvocatoriaListComponent;
  let fixture: ComponentFixture<ConvocatoriaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvocatoriaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvocatoriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
