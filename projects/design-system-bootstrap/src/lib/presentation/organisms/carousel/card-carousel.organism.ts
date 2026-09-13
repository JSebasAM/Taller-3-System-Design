import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild
} from '@angular/core';
import { CardCarouselConfig } from '../../../core/interfaces/core.interface';
import { AppCardMolecule } from '../../molecules/app-card/app-card.molecule';
import { CarouselControlMolecule } from '../../molecules/carousel-control/carousel-control.molecule';
@Component({
  selector: 'dsb-card-carousel.organism',
  templateUrl: './card-carousel.organism.html',
  styleUrl: './card-carousel.organism.css',
  imports: [CommonModule, AppCardMolecule, CarouselControlMolecule],
})
export class CardCarouselOrganism implements AfterViewInit, OnChanges {

  @Input({ required: true }) config!: CardCarouselConfig;

  @Output() itemSelected: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLElement>;

  currentIndex: number = 0;

  ngAfterViewInit(): void {}

  ngOnChanges(): void {
    this.currentIndex = 0;
  }

  get itemsPerView(): number {
    return this.config?.itemsPerView ?? 3;
  }

  get totalSlides(): number {
    return this.config?.items?.length ?? 0;
  }

  get cardWidthPercent(): string {
    return `${100 / this.itemsPerView}%`;
  }

  onSlideChange(index: number): void {
    this.currentIndex = index;
    this.scrollToIndex(index);
  }

  onCardClick(itemId: string): void {
    this.itemSelected.emit(itemId);
  }

  private scrollToIndex(index: number): void {
    if (!this.carouselTrack?.nativeElement) return;

    const track = this.carouselTrack.nativeElement;
    const cardWidth = track.scrollWidth / this.totalSlides;

    track.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  }
}
