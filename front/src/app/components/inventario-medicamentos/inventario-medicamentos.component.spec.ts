import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioMedicamentosComponent } from './inventario-medicamentos.component';

describe('InventarioMedicamentosComponent', () => {
  let component: InventarioMedicamentosComponent;
  let fixture: ComponentFixture<InventarioMedicamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventarioMedicamentosComponent]
    });
    fixture = TestBed.createComponent(InventarioMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
