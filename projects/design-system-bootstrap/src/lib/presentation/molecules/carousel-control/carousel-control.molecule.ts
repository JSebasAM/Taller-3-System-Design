import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CarouselControlConfig } from '../../../core/interfaces/core.interface';
import { DotIndicatorAtom } from '../../atoms/dot-indicator/dot-indicator.atom';
import { IconAtom } from '../../atoms/icon/icon.atom';

/**
 * Componente de controles para carrusel del Design System.
 *
 * @description
 * Componente tipo **Molécula** según Atomic Design.
 * Integra y reutiliza exclusivamente los átomos necesarios para la navegación:
 * - `IconAtom` para los botones de navegación anterior y siguiente.
 * - `DotIndicatorAtom` para los puntos de paginación e indicador de diapositiva activa.
 *
 * @example
 * ```html
 * <dsb-carousel-control-molecule
 *   [total]="5"
 *   [current]="currentIndex"
 *   (slideChange)="onSlideChange($event)">
 * </dsb-carousel-control-molecule>
 * ```
 */
@Component({
  selector: 'dsb-carousel-control-molecule',
  imports: [IconAtom, DotIndicatorAtom],
  templateUrl: './carousel-control.molecule.html',
  styleUrl: './carousel-control.molecule.scss',
})
export class CarouselControlMolecule {
  /**
   * Total de diapositivas a controlar.
   *
   * @defaultValue 0
   */
  @Input() total: number = 0;

  /**
   * Índice de la diapositiva actualmente activa (0-indexado).
   *
   * @defaultValue 0
   */
  @Input() current: number = 0;

  /**
   * Habilita o deshabilita la navegación circular (wrap-around).
   *
   * @defaultValue true
   */
  @Input() loop: boolean = true;

  /**
   * Deshabilita manualmente el botón anterior.
   * Si no se define, se calcula automáticamente según `loop` y `current`.
   */
  @Input() prevDisabled?: boolean;

  /**
   * Deshabilita manualmente el botón siguiente.
   * Si no se define, se calcula automáticamente según `loop` y `current`.
   */
  @Input() nextDisabled?: boolean;

  /**
   * Ícono para el botón anterior (nombre del icono de Bootstrap Icons sin prefijo `bi-`).
   *
   * @defaultValue 'chevron-left'
   */
  @Input() prevIcon: string = 'chevron-left';

  /**
   * Ícono para el botón siguiente (nombre del icono de Bootstrap Icons sin prefijo `bi-`).
   *
   * @defaultValue 'chevron-right'
   */
  @Input() nextIcon: string = 'chevron-right';

  /**
   * Etiqueta accesible para el botón anterior.
   *
   * @defaultValue 'Diapositiva anterior'
   */
  @Input() prevAriaLabel: string = 'Diapositiva anterior';

  /**
   * Etiqueta accesible para el botón siguiente.
   *
   * @defaultValue 'Diapositiva siguiente'
   */
  @Input() nextAriaLabel: string = 'Diapositiva siguiente';

  /**
   * Objeto de configuración opcional para el control.
   */
  @Input() config?: CarouselControlConfig;

  /**
   * Evento emitido al presionar el botón anterior.
   */
  @Output() prev: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Evento emitido al presionar el botón siguiente.
   */
  @Output() next: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Evento emitido con el nuevo índice destino al cambiar de diapositiva.
   *
   * @emits number Nuevo índice activo
   */
  @Output() slideChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Evento emitido al presionar un punto indicador específico.
   *
   * @emits number Índice del punto presionado
   */
  @Output() dotClick: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Retorna el total de diapositivas considerando el objeto `config` o el `@Input() total`.
   */
  get currentTotal(): number {
    return this.config?.total ?? this.total;
  }

  /**
   * Retorna el índice actual considerando el objeto `config` o el `@Input() current`.
   */
  get currentIndex(): number {
    return this.config?.current ?? this.current;
  }

  /**
   * Retorna si la navegación es cíclica.
   */
  get isLoop(): boolean {
    return this.config?.loop ?? this.loop;
  }

  /**
   * Determina si el botón anterior debe estar deshabilitado.
   */
  get isPrevDisabled(): boolean {
    if (this.prevDisabled !== undefined) {
      return this.prevDisabled;
    }
    if (this.currentTotal <= 1) {
      return true;
    }
    return !this.isLoop && this.currentIndex <= 0;
  }

  /**
   * Determina si el botón siguiente debe estar deshabilitado.
   */
  get isNextDisabled(): boolean {
    if (this.nextDisabled !== undefined) {
      return this.nextDisabled;
    }
    if (this.currentTotal <= 1) {
      return true;
    }
    return !this.isLoop && this.currentIndex >= this.currentTotal - 1;
  }

  /**
   * Genera el arreglo de índices para los indicadores de puntos.
   */
  get indicatorsArray(): number[] {
    const count = Math.max(0, this.currentTotal);
    return Array.from({ length: count }, (_, i) => i);
  }

  /**
   * Maneja el clic en el botón anterior.
   */
  onPrev(): void {
    if (this.isPrevDisabled) {
      return;
    }
    const target = this.currentIndex > 0 ? this.currentIndex - 1 : this.currentTotal - 1;

    this.prev.emit();
    this.slideChange.emit(target);
  }

  /**
   * Maneja el clic en el botón siguiente.
   */
  onNext(): void {
    if (this.isNextDisabled) {
      return;
    }
    const target = this.currentIndex < this.currentTotal - 1 ? this.currentIndex + 1 : 0;

    this.next.emit();
    this.slideChange.emit(target);
  }

  /**
   * Maneja el clic en un punto indicador.
   *
   * @param {number} index Índice seleccionado
   */
  onDotClick(index: number): void {
    this.dotClick.emit(index);
    this.slideChange.emit(index);
  }
}
