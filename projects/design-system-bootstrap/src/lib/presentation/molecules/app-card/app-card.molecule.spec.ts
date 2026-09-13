import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BadgeAtom } from '../../atoms/badge/badge.atom';
import { ImageAtom } from '../../atoms/image/image.atom';
import {
  MOCK_CARD_BADGE_DATA,
  MOCK_CARD_BADGE_TEXT,
  MOCK_CARD_BADGE_TYPE,
  MOCK_CARD_IMAGE_ALT,
  MOCK_CARD_IMAGE_DATA,
  MOCK_CARD_IMAGE_SRC,
  MOCK_CARD_TEXT,
  MOCK_CARD_TITLE,
} from '../../../mocks/card.mocks';
import { AppCardMolecule } from './app-card.molecule';

describe('AppCardMolecule', () => {
  let component: AppCardMolecule;
  let fixture: ComponentFixture<AppCardMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCardMolecule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppCardMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con valores por defecto correctos', () => {
    expect(component.title).toBe('');
    expect(component.text).toBe('');
    expect(component.image).toBe('');
    expect(component.imageAlt).toBe('');
    expect(component.imageAspectRatio).toBe('16/9');
    expect(component.imageObjectFit).toBe('cover');
    expect(component.badgeText).toBe('');
    expect(component.badgeType).toBe('primary');
    expect(component.badgeTypeText).toBe('text-white');
    expect(component.badge).toBeUndefined();
    expect(component.currentImageSrc).toBe('');
    expect(component.currentBadgeText).toBe('');
  });

  it('debería renderizar el título cuando se proporciona', () => {
    component.title = MOCK_CARD_TITLE;
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('.dsb-app-card__title'));
    expect(titleEl).toBeTruthy();
    expect(titleEl.nativeElement.textContent.trim()).toBe(MOCK_CARD_TITLE);
  });

  it('no debería renderizar el elemento de título cuando title está vacío', () => {
    component.title = '';
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('.dsb-app-card__title'));
    expect(titleEl).toBeNull();
  });

  it('debería renderizar el texto cuando se proporciona', () => {
    component.text = MOCK_CARD_TEXT;
    fixture.detectChanges();

    const textEl = fixture.debugElement.query(By.css('.dsb-app-card__text'));
    expect(textEl).toBeTruthy();
    expect(textEl.nativeElement.textContent.trim()).toBe(MOCK_CARD_TEXT);
  });

  it('no debería renderizar el elemento de texto cuando text está vacío', () => {
    component.text = '';
    fixture.detectChanges();

    const textEl = fixture.debugElement.query(By.css('.dsb-app-card__text'));
    expect(textEl).toBeNull();
  });

  it('debería renderizar el átomo de imagen cuando image es una URL string', () => {
    component.image = MOCK_CARD_IMAGE_SRC;
    component.imageAlt = MOCK_CARD_IMAGE_ALT;
    component.imageAspectRatio = '4/3';
    component.imageObjectFit = 'contain';
    fixture.detectChanges();

    const imageAtomEl = fixture.debugElement.query(By.directive(ImageAtom));
    expect(imageAtomEl).toBeTruthy();

    const imageAtomInstance = imageAtomEl.componentInstance as ImageAtom;
    expect(imageAtomInstance.src).toBe(MOCK_CARD_IMAGE_SRC);
    expect(imageAtomInstance.alt).toBe(MOCK_CARD_IMAGE_ALT);
    expect(imageAtomInstance.aspectRatio).toBe('4/3');
    expect(imageAtomInstance.objectFit).toBe('contain');
  });

  it('debería renderizar el átomo de imagen cuando image es un objeto CardImageData', () => {
    component.image = MOCK_CARD_IMAGE_DATA;
    fixture.detectChanges();

    const imageAtomEl = fixture.debugElement.query(By.directive(ImageAtom));
    expect(imageAtomEl).toBeTruthy();

    const imageAtomInstance = imageAtomEl.componentInstance as ImageAtom;
    expect(imageAtomInstance.src).toBe(MOCK_CARD_IMAGE_DATA.src);
    expect(imageAtomInstance.alt).toBe(MOCK_CARD_IMAGE_DATA.alt);
    expect(imageAtomInstance.aspectRatio).toBe(MOCK_CARD_IMAGE_DATA.aspectRatio);
    expect(imageAtomInstance.objectFit).toBe(MOCK_CARD_IMAGE_DATA.objectFit);
  });

  it('debería manejar CardImageData sin propiedades opcionales usando defaults', () => {
    component.image = { src: MOCK_CARD_IMAGE_SRC };
    component.title = MOCK_CARD_TITLE;
    fixture.detectChanges();

    expect(component.currentImageSrc).toBe(MOCK_CARD_IMAGE_SRC);
    expect(component.currentImageAlt).toBe(MOCK_CARD_TITLE);
    expect(component.currentAspectRatio).toBe('16/9');
    expect(component.currentObjectFit).toBe('cover');
  });

  it('debería usar title como fallback para currentImageAlt si imageAlt está vacío', () => {
    component.image = MOCK_CARD_IMAGE_SRC;
    component.imageAlt = '';
    component.title = MOCK_CARD_TITLE;
    fixture.detectChanges();

    expect(component.currentImageAlt).toBe(MOCK_CARD_TITLE);
  });

  it('no debería renderizar el contenedor de imagen cuando image no tiene valor', () => {
    component.image = '';
    fixture.detectChanges();

    const imgContainer = fixture.debugElement.query(By.css('.dsb-app-card__image-container'));
    expect(imgContainer).toBeNull();
  });

  it('debería renderizar el BadgeAtom cuando se proporciona badgeText', () => {
    component.badgeText = MOCK_CARD_BADGE_TEXT;
    component.badgeType = MOCK_CARD_BADGE_TYPE;
    fixture.detectChanges();

    const badgeAtomEl = fixture.debugElement.query(By.directive(BadgeAtom));
    expect(badgeAtomEl).toBeTruthy();

    const badgeAtomInstance = badgeAtomEl.componentInstance as BadgeAtom;
    expect(badgeAtomInstance.text).toBe(MOCK_CARD_BADGE_TEXT);
    expect(badgeAtomInstance.type).toBe(MOCK_CARD_BADGE_TYPE);
  });

  it('debería renderizar el BadgeAtom cuando se proporciona el objeto badge', () => {
    component.badge = MOCK_CARD_BADGE_DATA;
    fixture.detectChanges();

    const badgeAtomEl = fixture.debugElement.query(By.directive(BadgeAtom));
    expect(badgeAtomEl).toBeTruthy();

    const badgeAtomInstance = badgeAtomEl.componentInstance as BadgeAtom;
    expect(badgeAtomInstance.text).toBe(MOCK_CARD_BADGE_DATA.text);
    expect(badgeAtomInstance.type).toBe(MOCK_CARD_BADGE_DATA.type);
    expect(badgeAtomInstance.typeText).toBe(MOCK_CARD_BADGE_DATA.typeText);
  });

  it('debería usar defaults de tipo si el objeto badge no especifica type ni typeText', () => {
    component.badge = { text: 'Solo Texto' };
    fixture.detectChanges();

    expect(component.currentBadgeText).toBe('Solo Texto');
    expect(component.currentBadgeType).toBe('primary');
    expect(component.currentBadgeTypeText).toBe('text-white');
  });

  it('no debería renderizar el badge si ni badgeText ni badge tienen valor', () => {
    component.badgeText = '';
    component.badge = undefined;
    fixture.detectChanges();

    const badgeContainer = fixture.debugElement.query(By.css('.dsb-app-card__badge'));
    expect(badgeContainer).toBeNull();
  });
});

