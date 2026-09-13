import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MOCK_IMAGE_ALT,
  MOCK_IMAGE_ASPECT_RATIO,
  MOCK_IMAGE_FALLBACK_SRC,
  MOCK_IMAGE_OBJECT_FITS,
  MOCK_IMAGE_SRC,
} from '../../../mocks/image.mocks';
import { ImageAtom } from './image.atom';

describe('ImageAtom', () => {
  let component: ImageAtom;
  let fixture: ComponentFixture<ImageAtom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageAtom],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageAtom);
    component = fixture.componentInstance;
    component.src = MOCK_IMAGE_SRC;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar un elemento <img>', () => {
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
  });

  it('debería asignar currentSrc con el valor de src en ngOnInit', () => {
    component.src = MOCK_IMAGE_SRC;
    component.ngOnInit();
    expect(component.currentSrc).toBe(MOCK_IMAGE_SRC);
  });

  it('debería aplicar el atributo alt a la imagen', () => {
    component.alt = MOCK_IMAGE_ALT;
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.getAttribute('alt')).toBe(MOCK_IMAGE_ALT);
  });

  it('debería aplicar el aspect-ratio al contenedor', () => {
    component.aspectRatio = MOCK_IMAGE_ASPECT_RATIO;
    fixture.detectChanges();
    const wrapper = fixture.debugElement.query(By.css('.dsb-image-wrapper'));
    expect(wrapper.nativeElement.style.aspectRatio).toBe(MOCK_IMAGE_ASPECT_RATIO);
  });

  it('debería aplicar objectFit al elemento img', () => {
    MOCK_IMAGE_OBJECT_FITS.forEach(fit => {
      component.objectFit = fit;
      fixture.detectChanges();
      const img = fixture.debugElement.query(By.css('img'));
      expect(img.nativeElement.style.objectFit).toBe(fit);
    });
  });

  it('debería tener valores por defecto correctos', () => {
    const fresh = TestBed.createComponent(ImageAtom).componentInstance;
    expect(fresh.aspectRatio).toBe('16/9');
    expect(fresh.objectFit).toBe('cover');
    expect(fresh.alt).toBe('');
    expect(fresh.src).toBe('');
  });

  it('debería cambiar a fallbackSrc cuando ocurre un error de carga', () => {
    component.onError();
    expect(component.currentSrc).toBe(component.fallbackSrc);
  });

  it('debería usar una URL de fallback no vacía', () => {
    expect(component.fallbackSrc).toBeTruthy();
    expect(component.fallbackSrc.length).toBeGreaterThan(0);
  });

  it('debería cambiar currentSrc cuando se llama onError desde el template', () => {
    component.src = MOCK_IMAGE_FALLBACK_SRC;
    component.ngOnInit();
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img'));
    img.nativeElement.dispatchEvent(new Event('error'));
    expect(component.currentSrc).toBe(component.fallbackSrc);
  });
});
