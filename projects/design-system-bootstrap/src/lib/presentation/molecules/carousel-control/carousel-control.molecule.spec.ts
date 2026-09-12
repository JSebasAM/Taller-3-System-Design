import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DotIndicatorAtom } from '../../atoms/dot-indicator/dot-indicator.atom';
import { IconAtom } from '../../atoms/icon/icon.atom';
import {
  MOCK_CAROUSEL_CONFIG,
  MOCK_CAROUSEL_CURRENT,
  MOCK_CAROUSEL_TOTAL,
} from '../../../mocks/carousel-control.mock';
import { CarouselControlMolecule } from './carousel-control.molecule';

describe('CarouselControlMolecule', () => {
  let component: CarouselControlMolecule;
  let fixture: ComponentFixture<CarouselControlMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselControlMolecule],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselControlMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener valores por defecto coherentes', () => {
    expect(component.total).toBe(0);
    expect(component.current).toBe(0);
    expect(component.loop).toBe(true);
    expect(component.prevDisabled).toBeUndefined();
    expect(component.nextDisabled).toBeUndefined();
    expect(component.prevIcon).toBe('chevron-left');
    expect(component.nextIcon).toBe('chevron-right');
    expect(component.prevAriaLabel).toBe('Diapositiva anterior');
    expect(component.nextAriaLabel).toBe('Diapositiva siguiente');
    expect(component.isPrevDisabled).toBe(true); // total is 0 <= 1
    expect(component.isNextDisabled).toBe(true);
  });

  it('debería utilizar los valores de config cuando se proporciona', () => {
    component.config = MOCK_CAROUSEL_CONFIG;
    fixture.detectChanges();

    expect(component.currentTotal).toBe(MOCK_CAROUSEL_TOTAL);
    expect(component.currentIndex).toBe(MOCK_CAROUSEL_CURRENT);
    expect(component.isLoop).toBe(true);
  });

  it('debería renderizar los botones de navegación con IconAtom', () => {
    component.total = 3;
    fixture.detectChanges();

    const icons = fixture.debugElement.queryAll(By.directive(IconAtom));
    expect(icons.length).toBe(2);

    const prevIcon = icons[0].componentInstance as IconAtom;
    const nextIcon = icons[1].componentInstance as IconAtom;
    expect(prevIcon.icon).toBe('chevron-left');
    expect(nextIcon.icon).toBe('chevron-right');
  });

  it('debería emitir eventos prev y slideChange al hacer click en el botón anterior', () => {
    component.total = 5;
    component.current = 2;
    const prevSpy = jest.spyOn(component.prev, 'emit');
    const slideSpy = jest.spyOn(component.slideChange, 'emit');
    fixture.detectChanges();

    const prevBtn = fixture.debugElement.query(By.css('.dsb-carousel-control__btn--prev'));
    prevBtn.nativeElement.click();

    expect(prevSpy).toHaveBeenCalled();
    expect(slideSpy).toHaveBeenCalledWith(1);
  });

  it('debería hacer wrap al final cuando loop es true y se presiona anterior en el índice 0', () => {
    component.total = 5;
    component.current = 0;
    component.loop = true;
    const slideSpy = jest.spyOn(component.slideChange, 'emit');
    fixture.detectChanges();

    component.onPrev();
    expect(slideSpy).toHaveBeenCalledWith(4);
  });

  it('no debería navegar hacia atrás si isPrevDisabled es true', () => {
    component.total = 5;
    component.current = 0;
    component.loop = false;
    const prevSpy = jest.spyOn(component.prev, 'emit');
    fixture.detectChanges();

    expect(component.isPrevDisabled).toBe(true);
    component.onPrev();
    expect(prevSpy).not.toHaveBeenCalled();
  });

  it('debería emitir eventos next y slideChange al hacer click en el botón siguiente', () => {
    component.total = 5;
    component.current = 2;
    const nextSpy = jest.spyOn(component.next, 'emit');
    const slideSpy = jest.spyOn(component.slideChange, 'emit');
    fixture.detectChanges();

    const nextBtn = fixture.debugElement.query(By.css('.dsb-carousel-control__btn--next'));
    nextBtn.nativeElement.click();

    expect(nextSpy).toHaveBeenCalled();
    expect(slideSpy).toHaveBeenCalledWith(3);
  });

  it('debería hacer wrap a 0 cuando loop es true y se presiona siguiente en el último elemento', () => {
    component.total = 5;
    component.current = 4;
    component.loop = true;
    const slideSpy = jest.spyOn(component.slideChange, 'emit');
    fixture.detectChanges();

    component.onNext();
    expect(slideSpy).toHaveBeenCalledWith(0);
  });

  it('no debería navegar hacia adelante si isNextDisabled es true', () => {
    component.total = 5;
    component.current = 4;
    component.loop = false;
    const nextSpy = jest.spyOn(component.next, 'emit');
    fixture.detectChanges();

    expect(component.isNextDisabled).toBe(true);
    component.onNext();
    expect(nextSpy).not.toHaveBeenCalled();
  });

  it('debería respetar las propiedades prevDisabled y nextDisabled manuales', () => {
    component.total = 5;
    component.current = 2;
    component.prevDisabled = true;
    component.nextDisabled = true;
    fixture.detectChanges();

    expect(component.isPrevDisabled).toBe(true);
    expect(component.isNextDisabled).toBe(true);

    component.prevDisabled = false;
    component.nextDisabled = false;
    fixture.detectChanges();

    expect(component.isPrevDisabled).toBe(false);
    expect(component.isNextDisabled).toBe(false);
  });

  it('debería renderizar la cantidad correcta de DotIndicatorAtom y reflejar el estado activo', () => {
    component.total = 4;
    component.current = 1;
    fixture.detectChanges();

    const dots = fixture.debugElement.queryAll(By.directive(DotIndicatorAtom));
    expect(dots.length).toBe(4);

    dots.forEach((dotEl, index) => {
      const dot = dotEl.componentInstance as DotIndicatorAtom;
      expect(dot.index).toBe(index);
      expect(dot.active).toBe(index === 1);
    });
  });

  it('debería emitir dotClick y slideChange al presionar un punto indicador', () => {
    component.total = 4;
    component.current = 0;
    const dotSpy = jest.spyOn(component.dotClick, 'emit');
    const slideSpy = jest.spyOn(component.slideChange, 'emit');
    fixture.detectChanges();

    component.onDotClick(2);
    expect(dotSpy).toHaveBeenCalledWith(2);
    expect(slideSpy).toHaveBeenCalledWith(2);
  });

  it('no debería renderizar puntos indicadores si total es 0', () => {
    component.total = 0;
    fixture.detectChanges();

    const dotsContainer = fixture.debugElement.query(By.css('.dsb-carousel-control__indicators'));
    expect(dotsContainer).toBeNull();
  });
});
