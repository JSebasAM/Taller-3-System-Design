import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCarouselOrganism } from './card-carousel.organism';

describe('CardCarouselOrganism', () => {
  let component: CardCarouselOrganism;
  let fixture: ComponentFixture<CardCarouselOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCarouselOrganism]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCarouselOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
