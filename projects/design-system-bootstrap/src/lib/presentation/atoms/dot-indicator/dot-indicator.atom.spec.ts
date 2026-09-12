import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MOCK_DOT_ACTIVE,
  MOCK_DOT_INACTIVE,
  MOCK_DOT_INDEX,
  MOCK_DOT_INDICES,
} from '../../../mocks/dot-indicator.mocks';
import { DotIndicatorAtom } from './dot-indicator.atom';

describe('DotIndicatorAtom', () => {
  let component: DotIndicatorAtom;
  let fixture: ComponentFixture<DotIndicatorAtom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotIndicatorAtom],
    }).compileComponents();

    fixture = TestBed.createComponent(DotIndicatorAtom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener valores por defecto: index=0, active=false', () => {
    expect(component.index).toBe(0);
    expect(component.active).toBe(false);
  });

  it('debería renderizar un elemento <button>', () => {
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn).toBeTruthy();
  });

  it('debería tener la clase dsb-dot base', () => {
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).toContain('dsb-dot');
  });

  it('debería aplicar dsb-dot--active cuando active es true', () => {
    component.active = MOCK_DOT_ACTIVE;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).toContain('dsb-dot--active');
  });

  it('no debería tener dsb-dot--active cuando active es false', () => {
    component.active = MOCK_DOT_INACTIVE;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.classList).not.toContain('dsb-dot--active');
  });

  it('debería emitir el index correcto al hacer clic', () => {
    component.index = MOCK_DOT_INDEX;
    const spy = jest.spyOn(component.dotClick, 'emit');
    const btn = fixture.debugElement.query(By.css('button'));
    btn.nativeElement.click();
    expect(spy).toHaveBeenCalledWith(MOCK_DOT_INDEX);
  });

  it('debería emitir el index correcto para múltiples índices', () => {
    MOCK_DOT_INDICES.forEach(index => {
      component.index = index;
      const spy = jest.spyOn(component.dotClick, 'emit');
      component.onClick();
      expect(spy).toHaveBeenCalledWith(index);
    });
  });

  it('debería tener aria-label con el número de diapositiva correcto', () => {
    component.index = MOCK_DOT_INDEX;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.getAttribute('aria-label')).toBe(
      `Ir a la diapositiva ${MOCK_DOT_INDEX + 1}`
    );
  });

  it('debería tener aria-current=true cuando active es true', () => {
    component.active = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.getAttribute('aria-current')).toBe('true');
  });

  it('no debería tener aria-current cuando active es false', () => {
    component.active = false;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.getAttribute('aria-current')).toBeNull();
  });
});
