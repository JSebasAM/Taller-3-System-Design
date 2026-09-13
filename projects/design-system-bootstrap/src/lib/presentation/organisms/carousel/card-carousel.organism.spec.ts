import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  MOCK_CAROUSEL_CONFIG,
  MOCK_CAROUSEL_ITEMS,
  MOCK_CAROUSEL_ITEMS_PER_VIEW,
} from '../../../mocks/card-carousel.mocks';
import { AppCardMolecule } from '../../molecules/app-card/app-card.molecule';
import { CarouselControlMolecule } from '../../molecules/carousel-control/carousel-control.molecule';
import { CardCarouselOrganism } from './card-carousel.organism';

describe('CardCarouselOrganism', () => {
  let component: CardCarouselOrganism;
  let fixture: ComponentFixture<CardCarouselOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCarouselOrganism],
    }).compileComponents();

    fixture = TestBed.createComponent(CardCarouselOrganism);
    component = fixture.componentInstance;
    component.config = MOCK_CAROUSEL_CONFIG;
    
    // Mock ElementRef nativeElement for scrollToIndex
    component.carouselTrack = {
      nativeElement: { scrollWidth: 1000, scrollTo: jest.fn() } as unknown as HTMLElement
    };
    
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar currentIndex en 0', () => {
    expect(component.currentIndex).toBe(0);
  });

  it('debería calcular totalSlides correctamente', () => {
    expect(component.totalSlides).toBe(MOCK_CAROUSEL_ITEMS.length);
  });

  it('debería usar itemsPerView=3 como fallback si config no lo define', () => {
    component.config = { items: MOCK_CAROUSEL_ITEMS };
    expect(component.itemsPerView).toBe(3);
  });

  it('debería calcular cardWidthPercent correctamente', () => {
    expect(component.cardWidthPercent).toBe(
      `${100 / MOCK_CAROUSEL_ITEMS_PER_VIEW}%`
    );
  });

  it('debería actualizar currentIndex al llamar onSlideChange()', () => {
    if (component.carouselTrack?.nativeElement) {
      component.carouselTrack.nativeElement.scrollTo = jest.fn();
    }
    component.onSlideChange(3);
    expect(component.currentIndex).toBe(3);
  });

  it('debería emitir itemSelected con el ID correcto al llamar onCardClick()', () => {
    const spy = jest.spyOn(component.itemSelected, 'emit');
    component.onCardClick('card-2');
    expect(spy).toHaveBeenCalledWith('card-2');
  });

  it('debería resetear currentIndex a 0 cuando cambia config (ngOnChanges)', () => {
    component.currentIndex = 3;
    component.ngOnChanges();
    expect(component.currentIndex).toBe(0);
  });

  it('debería renderizar un AppCardMolecule por cada ítem', () => {
    const cards = fixture.debugElement.queryAll(By.directive(AppCardMolecule));
    expect(cards.length).toBe(MOCK_CAROUSEL_ITEMS.length);
  });

  it('debería pasar title, text, image y badge a cada AppCardMolecule', () => {
    const cards = fixture.debugElement.queryAll(By.directive(AppCardMolecule));
    const firstCard = cards[0].componentInstance as AppCardMolecule;

    expect(firstCard.title).toBe(MOCK_CAROUSEL_ITEMS[0].title);
    expect(firstCard.text).toBe(MOCK_CAROUSEL_ITEMS[0].text);
    expect(firstCard.image).toEqual(MOCK_CAROUSEL_ITEMS[0].image);
    expect(firstCard.badge).toEqual(MOCK_CAROUSEL_ITEMS[0].badge);
  });

  it('debería pasar total y current correctos a CarouselControlMolecule', () => {
    const control = fixture.debugElement.query(
      By.directive(CarouselControlMolecule)
    ).componentInstance as CarouselControlMolecule;

    expect(control.total).toBe(MOCK_CAROUSEL_ITEMS.length);
    expect(control.current).toBe(0);
  });

  it('debería actualizar currentIndex cuando CarouselControlMolecule emite slideChange', () => {
    const controlEl = fixture.debugElement.query(
      By.directive(CarouselControlMolecule)
    );
    const control = controlEl.componentInstance as CarouselControlMolecule;

    // mock scrollTo globally for this element just in case
    if (component.carouselTrack?.nativeElement) {
      component.carouselTrack.nativeElement.scrollTo = jest.fn();
    }

    control.slideChange.emit(2);
    expect(component.currentIndex).toBe(2);
  });

  it('no debería renderizar nada si config.items está vacío', () => {
    component.config = { items: [] };
    fixture.detectChanges();

    const wrapper = fixture.debugElement.query(By.css('.dsb-card-carousel'));
    expect(wrapper).toBeNull();
  });

  it('debería ejecutar ngAfterViewInit sin errores', () => {
    expect(() => component.ngAfterViewInit()).not.toThrow();
  });

  it('debería calcular isCardMode correctamente', () => {
    // MOCK_CAROUSEL_CONFIG has scrollMode: 'card'
    expect(component.isCardMode).toBe(true);
    
    component.config = { ...MOCK_CAROUSEL_CONFIG, scrollMode: 'page' };
    expect(component.isCardMode).toBe(false);

    component.config = { ...MOCK_CAROUSEL_CONFIG, scrollMode: undefined };
    expect(component.isCardMode).toBe(false);
  });

  it('debería calcular itemsPerView con el valor de config', () => {
    expect(component.itemsPerView).toBe(MOCK_CAROUSEL_ITEMS_PER_VIEW);
  });

  it('debería calcular totalSlides basado en isCardMode', () => {
    // Page mode: 5 items / 3 per view = 2 pages
    component.config = { ...MOCK_CAROUSEL_CONFIG, itemsPerView: 3, scrollMode: 'page' };
    expect(component.totalSlides).toBe(2);

    // Card mode: 5 items = 5 slides
    component.config = { ...MOCK_CAROUSEL_CONFIG, itemsPerView: 3, scrollMode: 'card' };
    expect(component.totalSlides).toBe(5);

    // No config items fallback
    component.config = { items: [] as any };
    expect(component.totalSlides).toBe(0);

    // Completely undefined config
    component.config = undefined as any;
    expect(component.totalSlides).toBe(0);
  });

  it('debería calcular maxCardWidth y cardWidth', () => {
    // Default maxCardWidth is 380px
    expect(component.maxCardWidth).toBe('380px');
    expect(component.cardWidth).toBe(`min(${component.cardWidthPercent}, 380px)`);

    // Custom maxCardWidth
    component.config = { ...MOCK_CAROUSEL_CONFIG, maxCardWidth: '500px' };
    expect(component.maxCardWidth).toBe('500px');
    expect(component.cardWidth).toBe(`min(${component.cardWidthPercent}, 500px)`);
  });

  describe('isActiveCard', () => {
    beforeEach(() => {
      component.config = { ...MOCK_CAROUSEL_CONFIG, itemsPerView: 2 };
      component.currentIndex = 1;
    });

    it('debería calcular activa correctamente en modo page', () => {
      component.config.scrollMode = 'page';
      // Page mode, currentIndex = 1, itemsPerView = 2
      // Active cards should be index 2 and 3
      expect(component.isActiveCard(0)).toBe(false);
      expect(component.isActiveCard(1)).toBe(false);
      expect(component.isActiveCard(2)).toBe(true);
      expect(component.isActiveCard(3)).toBe(true);
      expect(component.isActiveCard(4)).toBe(false);
    });

    it('debería calcular activa correctamente en modo card', () => {
      component.config.scrollMode = 'card';
      // Card mode, currentIndex = 1
      // Active card should be index 1 only
      expect(component.isActiveCard(0)).toBe(false);
      expect(component.isActiveCard(1)).toBe(true);
      expect(component.isActiveCard(2)).toBe(false);
    });
  });

  it('debería salir temprano de scrollToIndex si carouselTrack o nativeElement no existen', () => {
    component.carouselTrack = undefined as any;
    expect(() => component.onSlideChange(1)).not.toThrow();

    component.carouselTrack = { nativeElement: null } as any;
    expect(() => component.onSlideChange(1)).not.toThrow();
  });

  it('debería hacer scroll correctamente en modo card y manejar itemsCount fallback', () => {
    const mockScrollTo = jest.fn();
    component.carouselTrack = {
      nativeElement: { scrollWidth: 1000, scrollTo: mockScrollTo } as unknown as HTMLElement
    };
    
    // Set to card mode
    component.config = { ...MOCK_CAROUSEL_CONFIG, scrollMode: 'card' };
    component.onSlideChange(2);
    expect(mockScrollTo).toHaveBeenCalledWith({ left: 400, behavior: 'smooth' });

    // Fallback if items is undefined
    component.config = { items: undefined as any, scrollMode: 'card' };
    mockScrollTo.mockClear();
    component.onSlideChange(1);
    expect(mockScrollTo).toHaveBeenCalledWith({ left: 1000, behavior: 'smooth' });
  });

  it('debería hacer scroll correctamente en modo page', () => {
    const mockScrollTo = jest.fn();
    component.carouselTrack = {
      nativeElement: { scrollWidth: 1000, scrollTo: mockScrollTo } as unknown as HTMLElement
    };
    
    // Set to page mode
    component.config = { ...MOCK_CAROUSEL_CONFIG, itemsPerView: 2, scrollMode: 'page' };
    component.onSlideChange(1);
    
    // items.length = 5. singleCardWidth = 1000 / 5 = 200. step = 200 * 2 = 400. left = 1 * 400 = 400.
    expect(mockScrollTo).toHaveBeenCalledWith({ left: 400, behavior: 'smooth' });
  });
});
