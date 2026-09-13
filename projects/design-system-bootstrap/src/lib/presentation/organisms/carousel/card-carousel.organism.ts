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

/**
 * Organismo Carrusel de Cards del Design System.
 *
 * @description
 * Componente tipo **Organismo** según Atomic Design.
 * Orquesta múltiples instancias de `AppCardMolecule` dentro de un contenedor
 * deslizante y coordina la navegación mediante `CarouselControlMolecule`.
 *
 * @remarks
 * Utiliza `ElementRef` y `scrollTo` con `behavior: 'smooth'` para animar
 * el desplazamiento. El índice activo se sincroniza con los controles
 * a través del evento `(slideChange)` de `CarouselControlMolecule`.
 *
 * @example
 * ```html
 * <dsb-card-carousel-organism
 *   [config]="carouselConfig"
 *   (itemSelected)="onItemSelected($event)">
 * </dsb-card-carousel-organism>
 * ```
 */
@Component({
  selector: 'dsb-card-carousel-organism',
  templateUrl: './card-carousel.organism.html',
  styleUrl: './card-carousel.organism.scss',
  imports: [CommonModule, AppCardMolecule, CarouselControlMolecule],
})
export class CardCarouselOrganism implements AfterViewInit, OnChanges {

  /**
   * Configuración completa del carrusel.
   *
   * @remarks
   * Define los ítems, el número de cards visibles, el modo de desplazamiento y si el loop está activo.
   */
  @Input({ required: true }) config!: CardCarouselConfig;

  /**
   * Evento emitido cuando el usuario hace clic sobre una card.
   *
   * @emits string ID del ítem seleccionado
   */
  @Output() itemSelected: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Referencia al elemento HTML contenedor del track deslizante.
   */
  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLElement>;

  /**
   * Índice de la diapositiva actualmente visible.
   *
   * @defaultValue 0
   */
  currentIndex: number = 0;

  /**
   * Método del ciclo de vida ejecutado después de inicializar la vista.
   * @ignore
   */
  ngAfterViewInit(): void {}

  /**
   * Método del ciclo de vida ejecutado al cambiar las propiedades de entrada.
   * Resetea el índice actual a 0.
   * @ignore
   */
  ngOnChanges(): void {
    this.currentIndex = 0;
  }

  /**
   * Número de cards visibles simultáneamente.
   * Usa el valor de `config.itemsPerView` o 3 como fallback.
   *
   * @returns {number} Número de ítems por vista
   */
  get itemsPerView(): number {
    return this.config?.itemsPerView ?? 3;
  }

  /**
   * Indica si el modo de desplazamiento es por card individual.
   *
   * @returns {boolean} `true` si el modo es 'card', de lo contrario `false`
   */
  get isCardMode(): boolean {
    return this.config?.scrollMode === 'card';
  }

  /**
   * Total de diapositivas en el carrusel.
   * Si está en modo card, devuelve la cantidad total de ítems.
   * De lo contrario, calcula el número de páginas necesarias.
   *
   * @returns {number} Total de diapositivas
   */
  get totalSlides(): number {
    const total = this.config?.items?.length ?? 0;
    return this.isCardMode ? total : Math.ceil(total / this.itemsPerView);
  }

  /**
   * Ancho porcentual de cada card calculado según `itemsPerView`.
   *
   * @returns {string} Valor CSS (ej. `'33.33%'`)
   */
  get cardWidthPercent(): string {
    return `${100 / this.itemsPerView}%`;
  }

  /**
   * Ancho máximo de la card.
   * Usa el valor de `config.maxCardWidth` o '380px' como fallback.
   *
   * @returns {string} Valor CSS (ej. `'380px'`)
   */
  get maxCardWidth(): string {
    return this.config?.maxCardWidth ?? '380px';
  }

  /**
   * Ancho final de la card utilizando la función CSS min() para respetar el ancho máximo.
   *
   * @returns {string} Valor CSS usando min()
   */
  get cardWidth(): string {
    return `min(${this.cardWidthPercent}, ${this.maxCardWidth})`;
  }

  /**
   * Maneja el cambio de slide emitido por `CarouselControlMolecule`.
   * Actualiza `currentIndex` y desplaza el track al índice correspondiente.
   *
   * @param {number} index Nuevo índice activo
   * @returns {void}
   */
  onSlideChange(index: number): void {
    this.currentIndex = index;
    this.scrollToIndex(index);
  }

  /**
   * Maneja el clic sobre una card y propaga el ID al componente padre.
   *
   * @param {string} itemId ID del ítem seleccionado
   * @returns {void}
   */
  onCardClick(itemId: string): void {
    this.itemSelected.emit(itemId);
  }

  /**
   * Determina si la card en el índice proporcionado está actualmente activa.
   * Útil para aplicar estilos de resaltado (ej. agrandar la card central).
   *
   * @param {number} index Índice de la card a evaluar
   * @returns {boolean} `true` si es la card activa
   */
  isActiveCard(index: number): boolean {
    if (this.isCardMode) {
      return index === this.currentIndex;
    }
    // Para modo página, la card "activa" podría ser la primera de la vista actual
    return index >= this.currentIndex * this.itemsPerView && index < (this.currentIndex + 1) * this.itemsPerView;
  }

  /**
   * Desplaza el track al slide indicado usando `scrollTo` con animación suave.
   * Si el modo es 'card', salta una card a la vez. De lo contrario, salta por páginas completas.
   *
   * @param {number} index Índice del slide destino
   * @returns {void}
   */
  private scrollToIndex(index: number): void {
    if (!this.carouselTrack?.nativeElement) return;

    const track = this.carouselTrack.nativeElement;
    const itemsCount = this.config?.items?.length ?? 1;
    const singleCardWidth = track.scrollWidth / itemsCount;
    const step = this.isCardMode ? singleCardWidth : singleCardWidth * this.itemsPerView;

    track.scrollTo({
      left: index * step,
      behavior: 'smooth',
    });
  }
}
