import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Átomo de punto indicador para paginación y navegación.
 *
 * @description
 * Representa un único punto de paginación que puede estar
 * en estado activo o inactivo. Al hacer clic emite su
 * índice para que el componente padre gestione la navegación.
 *
 * @remarks
 * Este componente sigue el enfoque de diseño atómico como un **átomo**.
 * Se utiliza como bloque base de indicadores de carrusel,
 * galerías o pasos de un wizard.
 *
 * @example
 * ```html
 * <dsb-dot-indicator-atom
 *   [index]="2"
 *   [active]="currentIndex === 2"
 *   (dotClick)="onDotClick($event)">
 * </dsb-dot-indicator-atom>
 * ```
 */
@Component({
  selector: 'dsb-dot-indicator-atom',
  template: `
    <button
      type="button"
      class="dsb-dot"
      [class.dsb-dot--active]="active"
      [attr.aria-label]="'Ir a la diapositiva ' + (index + 1)"
      [attr.aria-current]="active ? 'true' : null"
      (click)="onClick()">
    </button>`,
  styles: [`
    .dsb-dot {
      display: inline-block;
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      background-color: #6c757d;
      border: none;
      padding: 0;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.2s ease;
    }
    .dsb-dot--active {
      background-color: #0d6efd;
      transform: scale(1.25);
    }
    .dsb-dot:focus-visible {
      outline: 2px solid #0d6efd;
      outline-offset: 2px;
    }
  `],
})
export class DotIndicatorAtom {
  /**
   * Índice del punto dentro del grupo de indicadores.
   *
   * @remarks
   * Este valor es emitido por `dotClick` al hacer clic,
   * permitiendo al padre identificar qué punto fue seleccionado.
   *
   * @defaultValue 0
   */
  @Input() index: number = 0;

  /**
   * Estado activo del punto.
   *
   * @remarks
   * - `true`: El punto representa el elemento actual (resaltado).
   * - `false`: El punto representa un elemento inactivo.
   *
   * @defaultValue false
   */
  @Input() active: boolean = false;

  /**
   * Evento emitido al hacer clic en el punto.
   *
   * @emits number Índice del punto presionado.
   *
   * @example
   * ```html
   * (dotClick)="cambiarDiapositiva($event)"
   * ```
   */
  @Output() dotClick: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Emite el evento `dotClick` con el índice del punto.
   *
   * @returns {void}
   */
  onClick(): void {
    this.dotClick.emit(this.index);
  }
}
